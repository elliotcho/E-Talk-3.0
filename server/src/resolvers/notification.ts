import { 
    Ctx,
    FieldResolver,
    Query, 
    Resolver, 
    Root
} from "type-graphql";
import { getConnection } from "typeorm";
import { Notification } from '../entities/Notification';
import { User } from '../entities/User';
import { MyContext } from "../types";

@Resolver(Notification)
export class NotificationResolver {
    @FieldResolver(() => String) 
    text(
        @Root() notification: Notification 
    ) : string | undefined {
        const { type } = notification;

        if(type === 'like') {
            return 'liked your post';
        }

        else if(type === 'comment') {
            return 'commented on your post';
        }

        else {
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