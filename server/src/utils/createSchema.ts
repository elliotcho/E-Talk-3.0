import { buildSchema } from 'type-graphql';
import { UserResolver } from '../resolvers/user';
import { PostResolver, CommentResolver } from '../resolvers/post';
import { NotificationResolver } from '../resolvers/notification'; 
import { ChatResolver } from '../resolvers/chat';
import { FriendResolver } from '../resolvers/friend';

export const createSchema = async () => (
    await buildSchema({
        validate: false,
        resolvers: [
            FriendResolver,
            CommentResolver,
            NotificationResolver,
            ChatResolver,
            PostResolver,
            UserResolver
        ]   
    })
);