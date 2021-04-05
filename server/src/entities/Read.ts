import {
    PrimaryColumn,
    CreateDateColumn,
    Entity,
    BaseEntity,
    ManyToOne
} from 'typeorm';
import { Message } from './Message';

@Entity()
export class Read extends BaseEntity {
    @PrimaryColumn()
    userId: number;

    @PrimaryColumn()
    messageId: number;

    @ManyToOne(() => Message, (message) => message.readReceipts)
    message: Message;

    @CreateDateColumn()
    createdAt: Date;
}