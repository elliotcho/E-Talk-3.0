import { ObjectType, Field } from 'type-graphql';
import {
   Entity,
   BaseEntity,
   PrimaryGeneratedColumn,
   Column,
   CreateDateColumn,
   UpdateDateColumn,
   ManyToOne,
} from 'typeorm';
import { Chat } from './Chat';

@ObjectType()
@Entity()
export class Message extends BaseEntity{
    @Field()
    @PrimaryGeneratedColumn()
    id! : number;

    @Field()
    @Column()
    text: string;

    @Field()
    @Column()
    userId: number;

    @Field()
    @Column()
    chatId: number;

    @Field(() => Chat)
    @ManyToOne(() => Chat, (chat) => chat.messages, {
        onDelete: 'CASCADE'
    })
    chat: Chat;

    @Field(() => String)
    @CreateDateColumn()
    createdAt : Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}