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
import { v4 } from 'uuid';
import { GraphQLUpload } from 'graphql-upload';
import { getConnection } from 'typeorm';
import { Chat } from '../entities/Chat';
import { Member } from '../entities/Member';
import { Message } from '../entities/Message';
import { User } from '../entities/User';
import { formatChatTitle } from '../utils/formatChatTitle';
import { uploadFile } from '../utils/uploadFile';
import { MyContext, Upload } from '../types';
import path from 'path';

@Resolver(Message)
export class MessageResolver {
    @FieldResolver()
    async photoURL(
        @Root() { photo }: Message
    ) : Promise<string> {
        if(photo) {
            return `${process.env.SERVER_URL}/images/${photo}`;
        }

        return '';
    }

    @FieldResolver(() => User)
    async user(
        @Root() message: Message
    ) : Promise<User | undefined> {
        return User.findOne(message.userId);
    }
}

@Resolver(Chat)
export class ChatResolver {
    @FieldResolver(() => String)
    async title(
        @Root() chat: Chat,
        @Ctx() { req } : MyContext
    ): Promise<string> {
        const { uid } = req.session;

        const members = await getConnection().query(
            `
                select u.* from "user" as u 
                inner join member as m on m."userId" = u.id
                inner join chat as c on c.id = m."chatId"
                where c.id = $1
            `, [chat.id]
        );
    
        return formatChatTitle(uid, members);
    }

    @FieldResolver(() => Message)
    async lastMessage(
        @Root() chat: Chat
    ) : Promise<Message | undefined> {
        const messages = await getConnection().query(
            `
                select * from message as m where m."chatId" = $1
                order by m."createdAt" DESC
            `, [chat.id]
        )

        return messages[0];
    }

    @FieldResolver(() => String)
    async picture(
        @Root() chat: Chat,
        @Ctx() { req } : MyContext
    ) : Promise<string> {
        const { uid } = req.session;

        const members = await getConnection().query(
            `
                select u.* from "user" as u 
                inner join member as m on m."userId" = u.id
                inner join chat as c on c.id = m."chatId"
                where c.id = $1
            `, [chat.id]
        );

        let url = `${process.env.SERVER_URL}/images/default.png`;

        for(let i=0;i<members.length;i++) {
            const profilePic = members[i].profilePic;
            const isMe = members[i].id === uid;

            if(!isMe && profilePic) {
                url = `${process.env.SERVER_URL}/images/${profilePic}`;
                break;
            }
        }

        return url;
    }

    @Mutation(() => Boolean)
    async sendMessage(
        @Arg('chatId', () => Int) chatId: number,
        @Arg('file', () => GraphQLUpload, { nullable: true }) file : Upload,
        @Arg('text', { nullable: true }) text: string,
        @Ctx() { req } : MyContext
    ) : Promise<boolean> {
        const { uid } = req.session;
        let replacements: any[];
        let query: string;

        if(file) {
            const photo = 'MESSAGE-' + v4() + path.extname(file.filename);
            const pathname = path.join(__dirname, `../../images/${photo}`);

            await uploadFile(file.createReadStream, pathname);
            
            replacements = [chatId, uid, photo];

            query = `
                insert into message ("chatId", "userId", photo)
                values ($1, $2, $3)
            `;
        }
        
        else {
            replacements = [chatId, uid, text];

            query = `
                insert into message ("chatId", "userId", text)
                values ($1, $2, $3)
            `;
        }

        await getConnection().query(query, replacements);
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
                inner join member on member."chatId" = c.id
                where member."userId" = $1 
                order by c."updatedAt" DESC
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
                select * from message as m where m."chatId" = $1  
                order by m."createdAt" DESC
            `, [chatId]
        );

        return messages;
    }

    @Query(() => Chat, { nullable: true })
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
        const { uid } = req.session;

        if(uid && !members.includes(uid)) {
            members.push(uid);
        }

        await getConnection().transaction(async tm => {
            const isPrivate = members.length === 2;

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
                    `, 
                    [chat.id, members[i]]
                );
            }

            await tm.query(
                `
                    insert into message ("chatId", "userId", "text")
                    values ($1, $2, $3)
                `,
                [chat.id, req.session.uid, text]
            );
        });

        return chat.id;
    }
}