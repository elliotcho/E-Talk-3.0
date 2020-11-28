import { User } from '../entities/User';
import argon2 from 'argon2';
import {
    Arg,
    Field,
    ObjectType,
    Mutation,
    Resolver,
    InputType,
    Ctx, 
} from 'type-graphql';
import { getConnection } from 'typeorm';
import { MyContext } from '../types';

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
    @Field(() => [FieldError], {nullable: true})
    errors? : FieldError[]
    @Field(() => User, {nullable: true})
    user? : User
}

@Resolver()
export class UserResolver{
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

        const valid = argon2.verify(user.password, input.password);

        if(!valid){
            return {
                errors: [{
                    field: 'Password',
                    message: 'Incorrect password'
                }]
            };
        }

        req.session.uid = user.id;

        return { user };
    }
}