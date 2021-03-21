import { 
    Arg,
    Ctx,
    Field,
    FieldResolver,
    Int,
    ObjectType,
    Query, 
    Resolver, 
    Root
} from "type-graphql";
import { getConnection } from "typeorm";
import { Notification } from '../entities/Notification';
import { Post } from '../entities/Post';
import { User } from '../entities/User';
import { MyContext } from "../types";

@ObjectType()
class PaginatedNotifications {
    @Field(() => [Notification])
    notifications!: [Notification] | [];
    @Field(() => Boolean)
    hasMore!: boolean;
}

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

    @Query(() => PaginatedNotifications)
    async notifications (
        @Arg('cursor' , () => String, { nullable: true }) cursor: string | null,
        @Arg('limit', () => Int) limit: number,
        @Ctx() { req } : MyContext
    ) : Promise<PaginatedNotifications> {
        const { uid } = req.session;
        const realLimit = Math.min(limit, 50);
        let date;

        if(cursor) {
            date = new Date(parseInt(cursor));
        }

        const notifications = await getConnection().query(
            `
                select * from notification as n 
                where n."receiverId" = $2
                ${cursor? `and n."createdAt" < $3` : ``}
                order by n."createdAt" DESC
                limit $1
            `, cursor? [realLimit + 1, uid, date] : [realLimit + 1, uid]
        );

        return {
            hasMore: notifications.length === realLimit + 1,
            notifications: notifications.slice(0, realLimit)
        }
    }
}