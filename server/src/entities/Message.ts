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
import { User } from './User';

@ObjectType()
@Entity()
export class Message extends BaseEntity{
    @Field()
    @PrimaryGeneratedColumn()
    id! : number;

    @Field(() => String, { nullable: true })
    @Column({ default: '' })
    text: string;

    @Column({ default: '' })
    photo: string;

    @Field()
    photoURL: string;

    @Field()
    @Column()
    userId: number;

    @Field()
    @Column()
    chatId: number;

    @Field()
    user: User;

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