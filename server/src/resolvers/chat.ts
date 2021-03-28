import {
    Arg,
    Ctx,
    Int,
    Mutation,
    Resolver
} from 'type-graphql';
import { getConnection } from 'typeorm';
import { Chat } from '../entities/Chat';
import { MyContext } from '../types';

@Resolver(Chat)
export class ChatResolver {
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