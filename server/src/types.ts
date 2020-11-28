import { Request, Response } from 'express';
import { Session } from 'express-session';
import { Redis } from 'ioredis';

export type MyContext = {
    req: Request & { session: Session & {uid?: number} };
    redis: Redis;
    res: Response;
}