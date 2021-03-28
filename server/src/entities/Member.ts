import { ObjectType, Field } from 'type-graphql';
import {
   Entity,
   BaseEntity,
   PrimaryColumn,
   ManyToOne,
} from 'typeorm';
import { Chat } from './Chat';

@ObjectType()
@Entity()
export class Member extends BaseEntity{
    @Field()
    @PrimaryColumn()
    userId: number;

    @Field()
    @PrimaryColumn()
    chatId: number;

    @Field(() => Chat)
    @ManyToOne(() => Chat, (chat) => chat.members, {
        onDelete: 'CASCADE'
    })
    chat: Chat;
}