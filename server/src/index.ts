import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import session from 'express-session';
import connectRedis from 'connect-redis';
import Redis from 'ioredis';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server-express';
import { createSchema } from './utils/createSchema';
import { Friend } from './entities/Friend';
import { Comment } from './entities/Comment';
import { User } from './entities/User';
import { Post } from './entities/Post';
import { Like } from './entities/Like';
import http from 'http';
import cors from 'cors';
import path from 'path';

const main  = async () => {
    await createConnection({
        type: 'postgres',
        url: process.env.DB_URL,
        synchronize: true,
        logging: false,
        entities: [
            Friend,
            Comment,
            Post,
            User,
            Like
        ]
    });

    const app = express();

    const RedisStore = connectRedis(session);
    const redis = new Redis();

    app.use(
        cors({
            origin: process.env.CORS_ORIGIN,
            credentials: true
        })
    );
    
    app.use('/images', express.static(path.join(__dirname, '../images')));

    const sessionMiddleware = session({
        name: 'cid',
        store: new RedisStore({
            client: redis,
            disableTouch: true
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 *365 * 10, //10 years,
            httpOnly: true, 
            sameSite: 'lax', //csrf
            secure: false //includes http
        },
        saveUninitialized: true,
        secret: process.env.SESSION_SECRET as string,
        resave: false
    })

    app.use(sessionMiddleware);

    const apolloServer = new ApolloServer({
        schema: await createSchema(),
        context: ({ req, res, connection }) => {
            return ({ req, res, connection, redis });
        },
        subscriptions: {
            path: '/subscriptions',
            onConnect: (_, ws: any) => {
                return new Promise(res => 
                    sessionMiddleware(ws.upgradeReq, {} as any, () => {
                        res({ req: ws.upgradeReq });
                    })
                );
            }
        }
    });

    apolloServer.applyMiddleware({ app, cors: false });

    const httpServer = http.createServer(app);
    apolloServer.installSubscriptionHandlers(httpServer);

    const port = process.env.PORT;

    httpServer.listen(port, () => {
        console.log(`listening to port ${port}`);
    });
}

main().catch(err => {
    console.log(err);
});