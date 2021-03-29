import {
    Arg,
    Ctx,
    FieldResolver,
    Int,
    Mutation,
    Query,
    Resolver,
    Root
} from 'type-graphql';
import { getConnection } from 'typeorm';
import { Chat } from '../entities/Chat';
import { Member } from '../entities/Member';
import { Message } from '../entities/Message';
import { MyContext } from '../types';

@Resolver(Chat)
export class ChatResolver {
    @FieldResolver(() => String)
    async title(
        @Root() chat: Chat
    ): Promise<string> {
        const members = await getConnection().query(
            `
                select u.* from "user" as u 
                inner join member as m on m."userId" = u.id
                inner join chat as c on c.id = m."chatId"
                where c.id = $1
            `, [chat.id]
        );
        
        let output = '';

        for(let i=0;i<members.length;i++) {
            output += members[i].firstName;
            output += members[i].lastName;
        }
    
        return output;
    }

    @Mutation(() => Boolean)
    async sendMessage(
        @Arg('chatId', () => Int) chatId: number,
        @Arg('text') text: string,
        @Ctx() { req } : MyContext
    ) : Promise<boolean> {
        const { uid } = req.session;

        await getConnection().query(
            `
                insert into message ("chatId", "userId", text)
                values ($1, $2, $3)
            `, [chatId, uid, text]
        );

        await Chat.update({ id: chatId }, {});
        return true;
    }

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

    @Query(() => [Message])
    async messages(
        @Arg('chatId', () => Int) chatId: number
    ) : Promise<Message[]> {
        const messages = await getConnection().query(
            `
                select m.* from message as m
                where m."chatId" = $1  
            `, [chatId]
        );

        return messages;
    }

    @Query(() => Chat)
    async chat(
        @Arg('chatId', () => Int) chatId: number,
        @Ctx() { req } : MyContext
    ): Promise<Chat | undefined> {
        const { uid } = req.session;
        const member = await Member.findOne({ chatId, userId: uid });

        if(!member) {
            return undefined;
        }

        const chat = await Chat.findOne(chatId);
        return chat;
    }

    @Mutation(() => Int)
    async createChat(
        @Arg('members', () => [Int]) members: number[],
        @Arg('text') text: string,
        @Ctx() { req } : MyContext
    ): Promise<number> { 
        let chat: any;
        const isPrivate = members.length === 1;
        const { uid } = req.session;

        if(uid && !members.includes(uid)) {
            members.push(uid);
        }

        await getConnection().transaction(async tm => {
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

        return chat.id;
    }
}