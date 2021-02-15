import { buildSchema } from 'type-graphql';
import { UserResolver } from '../resolvers/user';
import { PostResolver } from '../resolvers/post'; 

export const createSchema = async () => (
    await buildSchema({
        validate: false,
        resolvers: [
            PostResolver,
            UserResolver
        ]   
    })
);