import { buildSchema } from 'type-graphql';
import { HelloResolver } from '../resolvers/hello';
import { UserResolver } from '../resolvers/user';

export const createSchema = async () => (
    await buildSchema({
        validate: false,
        resolvers: [
            HelloResolver,
            UserResolver
        ]   
    })
);