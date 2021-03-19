import { 
    Ctx,
    FieldResolver,
    Query, 
    Resolver, 
    Root
} from "type-graphql";
import { getConnection } from "typeorm";
import { Notification } from '../entities/Notification';
import { Post } from '../entities/Post';
import { User } from '../entities/User';
import { MyContext } from "../types";

@Resolver(Notification)
export class NotificationResolver {
    @FieldResolver(() => String) 
    async text(
        @Root() { type, postId }: Notification 
    ) : Promise<string | undefined> {
        const post = await Post.findOne(postId);
        let textSnippet = post?.content;

        if(post?.content && post.content.length > 30) {
            textSnippet = textSnippet?.substring(0, 30) + '...';
        }

        switch(type) {
            case 'comment': 
                return `commented on your post: ${textSnippet}`;
            case 'like': 
                return `liked your post: ${textSnippet}`;
            default: 
                return 'accepted your friend request';
        }
    }

    @FieldResolver(() => User)
    async user (
        @Root() notification: Notification
    ) : Promise<User | undefined> {
        return User.findOne(notification.senderId);
    }

    @Query(() => [Notification])
    async notifications (
        @Ctx() { req } : MyContext
    ) : Promise<Notification[]> {
        const notifications = await getConnection().query(
            `
                select * from notification as n 
                where n."receiverId" = $1  
            `, [req.session.uid]
        );

        return notifications;
    }
}