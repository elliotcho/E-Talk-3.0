import { User } from '../entities/User';
import { MyContext } from '../types';
import argon2 from 'argon2';
import {
    Arg,
    Ctx,
    Field,
    InputType,
    Mutation,
    Resolver, 
} from 'type-graphql';
import { getConnection } from 'typeorm';

@InputType()
class UserInput {
    @Field()
    email: string;
    @Field()
    password: string;
    @Field()
    firstName: string;
    @Field()
    lastName: string;
}

@Resolver(User)
export class UserResolver{
    @Mutation(() => User)
    async register(
        @Arg('input') input: UserInput,
        @Ctx() { req } : MyContext
    ) : Promise<User> {
        const hashedPassword = await argon2.hash(input.password);

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
        
        return result.raw[0];
    }
}