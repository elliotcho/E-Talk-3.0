import { createConnection } from 'typeorm';
import { Friend } from '../entities/Friend';
import { Notification } from '../entities/Notification';
import { Comment } from '../entities/Comment';
import { Chat } from '../entities/Chat';
import { Member } from '../entities/Member';
import { Message } from '../entities/Message';
import { User } from '../entities/User';
import { Post } from '../entities/Post';
import { Like } from '../entities/Like';
import { Read } from '../entities/Read';
import { Seen } from '../entities/Seen';

export const createDbConnection = async () => {
    await createConnection({
        type: 'postgres',
        url: process.env.DB_URL,
        synchronize: true,
        logging: false,
        entities: [
            Friend,
            Notification,
            Comment,
            Member, 
            Message,
            Chat,
            Post,
            User,
            Like,
            Read,
            Seen
        ]
    });
}