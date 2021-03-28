import {
    Arg,
    Ctx,
    Int,
    Mutation,
    Query,
    Resolver
} from 'type-graphql';
import { getConnection } from 'typeorm';
import { Chat } from '../entities/Chat';
import { MyContext } from '../types';

@Resolver(Chat)
export class ChatResolver {
    @Query(() => [Chat])
    async chats(
        @Ctx() { req } : MyContext
    ) : Promise<Chat[]> {
        const chats = await getConnection().query(
            `
                select c.* from chat as c
                inner join member as m on m."chatId" = c.id
                where m."userId" = $1
            `, [req.session.uid]
        );

        return chats;
    }

    @Mutation(() => Boolean)
    async createChat(
        @Arg('members', () => [Int]) members: number[],
        @Arg('text') text: string,
        @Ctx() { req } : MyContext
    ) { 
        const isPrivate = members.length === 1;
        const { uid } = req.session;

        if(uid && !members.includes(uid)) {
            members.push(uid);
        }

        await getConnection().transaction(async tm => {
            let chat;

            const result = await tm.createQueryBuilder()
                    .insert()
                    .into(Chat)
                    .values({ isPrivate })
                    .returning('*')
                    .execute();

            chat = result.raw[0];

            for(let i=0;i<members.length;i++) {
                await tm.query(
                    `
                        insert into member ("chatId", "userId")  
                        values ($1, $2)
                    `, [chat.id, members[i]]
                );
            }

            await tm.query(
                `
                    insert into message ("chatId", "userId", "text")
                    values ($1, $2, $3)
                `,[chat.id, req.session.uid, text]
            );
        });

        return true;
    }
}