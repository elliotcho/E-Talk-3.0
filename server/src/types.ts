import { Request, Response } from 'express';
import { Session } from 'express-session';
import { Redis } from 'ioredis';
import { Stream } from 'stream';

export type MyContext = {
    req: Request & { session: Session & { uid?: number } };
    res: Response;
    connection: any;
    redis: Redis;
}

export type SubscriptionPayload = {
    receiverId: number;
    senderId: number;
    postId?: number;
}

export type Upload = {
    createReadStream: () => Stream;
    filename: string;
    mimetype: string;
    encoding: string;
}