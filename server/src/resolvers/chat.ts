import {
    Arg,
    Ctx,
    FieldResolver,
    Int,
    Mutation,
    PubSub,
    PubSubEngine,
    Query,
    Resolver,
    Root,
    Subscription
} from 'type-graphql';
import { GraphQLUpload } from 'graphql-upload';
import { getConnection } from 'typeorm';
import { Chat } from '../entities/Chat';
import { Read } from '../entities/Read';
import { Member } from '../entities/Member';
import { Message } from '../entities/Message';
import { User } from '../entities/User';
import { Seen } from '../entities/Seen';
import { createMessage } from '../utils/createMessage';
import { filterSubscription } from '../utils/filterSubscription';
import { MyContext, SubscriptionPayload, Upload} from '../types';

const NEW_MESSAGE_EVENT = 'NEW_MESSAGE_EVENT';

@Resolver(Message)
export class MessageResolver {
    @FieldResolver()
    isOwner(
        @Root() { userId } : Message,
        @Ctx() { req } : MyContext
    ): boolean {
        return req.session.uid === userId;
    }

    @FieldResolver()
    async isRead(
        @Root() { id } : Message,
        @Ctx() { req } : MyContext
    ): Promise<boolean> {
        const isRead = await Read.findOne({
            where: {
                userId: req.session.uid,
                messageId: id
            }
        });

        return !!isRead;
    }

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
    
        let output = '';
    
        for(let i=0;i<members.length;i++) {
            const member = members[i];
    
            if(members.length !== 1 && uid === member.id) {
                continue;
            }
    
            output += member.firstName + ' ';
            output += member.lastName + ', ';
        }
    
        return output.substring(0, output.length - 2);
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

    @Subscription(() => Message,{
        topics: NEW_MESSAGE_EVENT,
        filter: filterSubscription
    })
    async newMessage (
        @Root() { senderId, receiverId } : SubscriptionPayload
    ) : Promise<Message | undefined> {
        return Message.findOne({ where: {
            chatId: receiverId,
            userId: senderId
        }});
    }

    @Mutation(() => Boolean)
    async seeChats(
        @Ctx() { req } : MyContext
    ) : Promise<boolean> {
        const { uid } = req.session;

        const chats = await getConnection().query(
            `
                select c.* from chat as c
                inner join member as m on m."chatId" = c.id
                where m."userId" = $1
            `, [uid]
        );

        await getConnection().transaction(async (tm) => {

            for(let i=0;i<chats.length;i++) {
                const seen = await Seen.findOne({ where: {
                    chatId: chats[i].id ,
                    userId: uid
                }});

                if(!seen) {
                    await tm.query(
                        `
                            insert into seen ("chatId", "userId")
                            values ($1, $2)
                        `,
                        [chats[i].id, uid]
                    );
                }
            }

        });

        return true;
    }

    @Query(() => [User])
    async readReceipts(
        @Arg('messageId', () => Int) messageId: number,
        @Ctx() { req } : MyContext
    ) : Promise<User[]> {
        const { uid } = req.session;

        const readReceipts = await getConnection().query(
            `
                select u.* from "user" as u
                inner join read as r on r."userId" = u.id 
                where r."messageId" = $1 and u.id != $2
            `, [messageId, uid]
        );

        return readReceipts;
    }

    @Mutation(() => Boolean)
    async readChat(
        @Arg('chatId', () => Int) chatId: number,
        @Ctx() { req } : MyContext
    ) : Promise<boolean> {
        const messages = await getConnection().query(
            `
                select m.* from message as m
                where m."chatId" = $1
            `, [chatId]
        );

        await getConnection().transaction(async (tm) => {
            for(let i=0;i<messages.length;i++) {
                const { id: messageId } = messages[i];
                
                const isRead = await Read.findOne({ where: {
                    userId: req.session.uid,
                    messageId
                }});
                
                if(!isRead) {
                    await tm.query(
                        `
                            insert into read ("userId", "messageId")
                            values ($1, $2)
                        `,
                        [req.session.uid, messageId]
                    );
                }
            }
        });

        return true;
    }

    @Mutation(() => Boolean)
    async sendMessage(
        @PubSub() pubSub: PubSubEngine,
        @Arg('chatId', () => Int) chatId: number,
        @Arg('file', () => GraphQLUpload, { nullable: true }) file : Upload,
        @Arg('text', { nullable: true }) text: string,
        @Ctx() { req } : MyContext
    ) : Promise<boolean> {
        const { uid } = req.session;
        
        const [query, replacements] = await createMessage(chatId, uid, file, text);
        await getConnection().query(query, replacements);

        await getConnection().query(
            `
                delete from seen as s
                where s."chatId" = $1 and
                s."userId" != $2
            `, [chatId, uid]
        );

        await pubSub.publish(NEW_MESSAGE_EVENT, {
            senderId: uid,
            receiverId: chatId,
            isChat: true
        });

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
        @PubSub() pubSub: PubSubEngine,
        @Arg('members', () => [Int]) members: number[],
        @Arg('file', () => GraphQLUpload, { nullable: true }) file: Upload,
        @Arg('text', { nullable: true }) text: string,
        @Ctx() { req } : MyContext
    ): Promise<number> { 
        let chatId: any;
        const { uid } = req.session;

        if(uid && !members.includes(uid)) {
            members.push(uid);
        }

        await getConnection().transaction(async tm => {
            const isPrivate = members.length <= 2;

            const result = await tm.createQueryBuilder()
                    .insert()
                    .into(Chat)
                    .values({ isPrivate })
                    .returning('*')
                    .execute();

            chatId = result.raw[0].id;

            for(let i=0;i<members.length;i++) {
                await tm.query(
                    `
                        insert into member ("chatId", "userId")  
                        values ($1, $2)
                    `, [chatId, members[i]]
                );
            }

            const [query, replacements] = await createMessage(chatId, uid, file, text);
            await tm.query(query, replacements);
        });

      
        await pubSub.publish(NEW_MESSAGE_EVENT, {
            senderId: uid,
            receiverId: chatId,
            isChat: true
        });
        
        return chatId;
    }
}