import { 
    Arg,
    Ctx,
    Int,
    Mutation,
    Resolver 
} from "type-graphql";
import { getConnection } from "typeorm";
import { Friend } from "../entities/Friend";
import { MyContext } from "../types";

@Resolver(Friend)
export class FriendResolver {
    @Mutation(() => Boolean)
    async acceptFriendRequest(
        @Arg('senderId', () => Int) senderId: number,
        @Ctx() { req } : MyContext
    ) {
        const { uid } = req.session;
        
        await getConnection().transaction(async tm => {
            await tm.query(
                `
                    update friend
                    where "senderId" = $1 and
                    "receiverId" = $2
                    set status = true
                `, [senderId, uid]
            );

            await tm.query(
                `
                    delete from friend
                    where "senderId" = $1
                    and "receiverId" = $2
                    and status = false
                `, [uid, senderId]
            );
        });

        return true;
    }

    @Mutation(() => Boolean)
    async declineFriendRequest(
        @Arg('senderId', () => Int) senderId: number,
        @Ctx() { req } : MyContext
    ) : Promise<boolean> {
        const { uid } = req.session;

        await getConnection().query(
            `
                delete from friend 
                where "senderId" = $1
                and "receiverId" = $2
                and status = false
            `,[senderId, uid]
        );

        return true;
    }

    @Mutation(() => Boolean)
    async sendFriendRequest(
        @Arg('receiverId', () => Int) recceiverId: number,
        @Ctx() { req } : MyContext
    ): Promise<boolean> {
        await getConnection().query(
            `
                insert into friend ("receiverId", "senderId")
                values ($1, $2)
            `, [recceiverId, req.session.uid]
        );

        return true;
    }
}