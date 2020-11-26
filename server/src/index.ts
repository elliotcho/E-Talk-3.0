import 'reflect-metadata';
import dotenv from  'dotenv';
import express from 'express';
import session from 'express-session';
import Redis from 'ioredis';
import connectRedis from 'connect-redis';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { User } from './entities/User';
import { UserResolver } from './resolvers/user';

dotenv.config();

const main  = async () => {
    await createConnection({
        type: 'postgres',
        database: process.env.DB,
        username: process.env.DB_USER,
        password: process.env.DB_PWD,
        logging: true,
        synchronize: true,
        entities: [User]
    });

    const app = express();

    const RedisStore = connectRedis(session);
    const redis = new Redis();

    app.use(
        session({
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
          saveUninitialized: false,
          secret: String(process.env.SESSION_SECRET),
          resave: false
        })
    );

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [UserResolver],
            validate: false
        }),
        context: ({req, res}) => ({req, res})
    });

    apolloServer.applyMiddleware({
        app
    });

    app.listen(4000, () => {
        console.log('server started on localhost:4000');
    })
}

main().catch(err => {
    console.log(err);
});