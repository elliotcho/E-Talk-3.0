import {
   Entity,
   BaseEntity,
   PrimaryColumn,
   ManyToOne,
} from 'typeorm';
import { Chat } from './Chat';

@Entity()
export class Member extends BaseEntity{
    @PrimaryColumn()
    userId: number;

    @PrimaryColumn()
    chatId: number;

    @ManyToOne(() => Chat, (chat) => chat.members, {
        onDelete: 'CASCADE'
    })
    chat: Chat;
}