import {
    Arg,
    Field,
    ObjectType,
    Mutation,
    Resolver,
    InputType,
    Ctx,
    Query,
    UseMiddleware
} from 'type-graphql';
import { GraphQLUpload } from 'graphql-upload';
import argon2 from 'argon2';
import { getConnection } from 'typeorm';
import { v4 } from 'uuid';
import { sendEmail } from '../utils/sendEmail';
import { User } from '../entities/User';
import { MyContext, Upload } from '../types';
import { isAuth } from '../middleware/isAuth';
import { createWriteStream } from 'fs';
import path from 'path';

@InputType()
class RegisterInput {
    @Field()
    email: string;
    @Field()
    password: string;
    @Field()
    firstName: string;
    @Field()
    lastName: string;
}

@InputType()
class LoginInput{
    @Field()
    email: string;
    @Field()
    password: string;
}

@ObjectType()
class FieldError {
    @Field()
    field: string;
    @Field()
    message: string;
}

@ObjectType()
class UserResponse {
    @Field(() => [FieldError], { nullable: true })
    errors? : FieldError[]
    @Field(() => User, { nullable: true })
    user? : User
}

@Resolver(User)
export class UserResolver{
    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async updateProfilePic (
        @Arg('file', () => GraphQLUpload) { createReadStream, filename } : Upload,
        @Ctx() { req } : MyContext
    ) : Promise<boolean> {
        const name = 'PROFILE-' + v4() + path.extname(filename);
        const { uid } = req.session;

        await getConnection().query(
            `
                update user
                set "profilePic" = $1
                where id = $2
            `, 
            [name, uid]
        );

        return new Promise(async (resolve, reject) => 
            createReadStream()
                .pipe(createWriteStream(path.join(__dirname, `../../images/${name}`)))
                .on('finish', () => resolve(true))
                .on('error', () => reject(false))
        );
    }

    @Query(() => User, { nullable: true })
    async me(
        @Ctx() { req } : MyContext
    ) : Promise<User | undefined> {
        if(!req.session.uid) {
            return undefined;
        }

        return User.findOne(req.session.uid);
    }

    @Mutation(() => UserResponse)
    async register(
        @Arg('input') input: RegisterInput,
        @Ctx() { req } : MyContext
    ) : Promise<UserResponse> {
        const hashedPassword = await argon2.hash(input.password);
        let user;

        try{
            const result = await getConnection()
            .createQueryBuilder()
            .insert()
            .into(User)
            .values({
                email: input.email,
                password: hashedPassword,
                firstName: input.firstName,
                lastName: input.lastName
            })
            .returning('*')
            .execute();

            user = result.raw[0];
        } catch (err) {
            if(err.code === '23505'){
                return {
                    errors: [{
                        field: 'email', 
                        message: 'email already exists'
                    }]
                }
            }
        }

        req.session.uid = user.id;
        
        return { user };
    }

    @Mutation(() => UserResponse)
    async login(
        @Arg('input') input : LoginInput,
        @Ctx() { req } : MyContext
    ) : Promise<UserResponse> {  
        const user = await User.findOne({where: {email : input.email}});

        if(!user){
            return {
                errors: [{
                    field: 'email',
                    message: 'Email is not registered'
                }]
            };
        }

        const valid = await argon2.verify(user.password, input.password);

        if(!valid){
            return {
                errors: [{
                    field: 'password',
                    message: 'Incorrect password'
                }]
            };
        }

        req.session.uid = user.id;
 
        return { user };
    }

    @Mutation(() => Boolean)
    async logout(
        @Ctx() { req, res } : MyContext
    ) : Promise<Boolean> {
        return new Promise(resolve => {
            req.session.destroy(err => {
                res.clearCookie('cid');

                if(err){
                    resolve(false);
                }

                resolve(true);
            });
        });
    }

    @Mutation(() => Boolean)
    async forgotPassword(
        @Arg('email') email: string,
        @Ctx() { redis } : MyContext
    ) : Promise<Boolean> {
        const user = await User.findOne({ where : { email }});

        if(!user){
            return true;
        }

        const token = v4();
        const href = `<a href="http://localhost:3000/change-password/${token}">Reset Password</a>`;
        const expiresIn = 1000 * 60 * 60 * 24 * 3; //3 days

        await redis.set(token, user.id, 'ex', expiresIn);
        await sendEmail(email, href);

        return true;
    }

    @Mutation(() => UserResponse)
    async changePassword(
        @Arg('token') token: string,
        @Arg('newPassword') newPassword: string,
        @Ctx() { req, redis } : MyContext
    ) : Promise<UserResponse> {
        const uid = await redis.get(token);

        console.log(uid)

        if(!uid){
            return  {
                errors: [{
                    field: 'token',
                    message: 'token expired'
                }]
            };
        }

        const user = await User.findOne(parseInt(uid));

        if(!user){
            return { 
                errors: [{
                    field: 'token',
                    message: 'user no longer exists'
                }]
            }
        }

        await User.update({ id: user.id }, { password: await argon2.hash(newPassword) });
        await redis.del(token);

        req.session.uid = user.id;

        return { user }
    }
}