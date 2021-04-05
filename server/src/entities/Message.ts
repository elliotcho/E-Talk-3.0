import { ObjectType, Field } from 'type-graphql';
import {
   Entity,
   BaseEntity,
   PrimaryGeneratedColumn,
   Column,
   CreateDateColumn,
   UpdateDateColumn,
   ManyToOne,
   OneToMany,
} from 'typeorm';
import { Read } from './Read';
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
    isRead: boolean;

    @Field()
    user: User;

    @ManyToOne(() => Chat, (chat) => chat.messages, {
        onDelete: 'CASCADE'
    })
    chat: Chat;

    @OneToMany(() => Read, (read) => read.message)
    readReceipts: Read[];

    @Field(() => String)
    @CreateDateColumn()
    createdAt : Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}