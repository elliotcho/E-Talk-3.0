import {
    PrimaryColumn,
    CreateDateColumn,
    Entity,
    BaseEntity,
    ManyToOne
} from 'typeorm';
import { Chat } from './Chat';

@Entity()
export class Seen extends BaseEntity {
    @PrimaryColumn()
    userId: number;

    @PrimaryColumn()
    chatId: number;

    @ManyToOne(() => Chat, (chat) => chat.seenBy, {
        onDelete: 'CASCADE'
    })
    chat: Chat;

    @CreateDateColumn()
    createdAt: Date;
}