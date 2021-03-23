import { 
    Arg,
    Ctx,
    Field,
    FieldResolver,
    Int,
    Mutation,
    ObjectType,
    PubSub,
    PubSubEngine,
    Query,
    Resolver, 
    Root, 
    Subscription, 
    UseMiddleware
} from "type-graphql";
import { getConnection } from "typeorm";;
import { isAuth } from "../middleware/isAuth";
import { Notification } from '../entities/Notification';
import { Comment } from '../entities/Comment';
import { Like } from '../entities/Like';
import { Post } from '../entities/Post';
import { User } from '../entities/User';

import { MyContext, SubscriptionPayload } from '../types';

const NEW_LIKE_EVENT = 'NEW_LIKE_EVENT';

@ObjectType()
class PaginatedPosts {
    @Field(() => [Post])
    posts!: [Post] | [];
    @Field(() => Boolean)
    hasMore!: boolean;
}

@Resolver(Comment)
export class CommentResolver {
    @FieldResolver(() => User)
    async user (
        @Root() comment: Comment
    ) : Promise <User | undefined > {
        return User.findOne(comment.userId);
    }
}

@Resolver(Post)
export class PostResolver {
    @FieldResolver(() => Boolean)
    async likeStatus(
        @Root() post: Post,
        @Ctx() { req } : MyContext
    ) : Promise<boolean> {
        const { uid } = req.session;

        const like = await Like.findOne({ userId: uid, postId: post.id });

        return like? true: false;
    }

    @FieldResolver(() => User) 
    async user(
        @Root() post: Post
    ) : Promise<User | undefined> {
        return User.findOne(post.userId);
    }

    @Subscription(() => Notification, { 
        topics: NEW_LIKE_EVENT,
        filter: ({ payload, context }) => {
            const { req } = context.connection.context;
            const { uid } = req.session;

            context.req = req;

            return payload.receiverId === uid;
        }
    })
    async newLike( 
        @Root() payload: SubscriptionPayload,
    ): Promise<Notification | undefined> {
        return Notification.findOne({ where: {
            ...payload, type: 'like'
        }});
    }

    @Mutation(() => Boolean)
    async editComment(
        @Arg('commentId', () => Int) commentId: number,
        @Arg('newContent') newContent: string
    ) : Promise<boolean> {
        const replacements = [newContent, commentId];

        await getConnection().query(
            `
                update comment 
                set text = $1
                where id = $2
            `, replacements
        );

        return true;
    }

    @Mutation(() => Boolean)
    async deleteComment(
        @Arg('commentId', () => Int) commentId: number,
        @Arg('postId', () => Int) postId: number,
        @Ctx() { req } : MyContext
    ) : Promise<boolean> {
        const { uid } = req.session;

        const post = await Post.findOne(postId);
        const receiverId = post?.userId;

        await getConnection().transaction(async tm => {
            await tm.query(
                `
                    delete from comment where 
                    id = $1
                `, [commentId]
            );
            
            await tm.query(

                `
                    update post
                    set "numComments" = "numComments" - 1
                    where id = $1
                `, [postId]
            );

            if(receiverId === uid) {
                return;
            }

            await tm.query(
                `
                    delete from notification as n
                    where n."senderId" = $1 and n."receiverId" = $2 and
                    n."postId" = $3 and n.type = $4
                `,[uid, receiverId, postId, 'comment']
            );
        });
        
        return true;
    }

    @Query(() => [Comment])
    async comments(
        @Arg('postId', () => Int) postId: number
    ) : Promise<[Comment]> {
        const comments = await getConnection().query(
            `
                select * from comment where
                comment."postId" = $1
                order by comment."createdAt" 
                DESC

            `, [postId]
        );

        return comments;
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async createComment(
        @Arg('postId', () => Int) postId: number,
        @Arg('text') text: string, 
        @Ctx() { req } : MyContext
    ) : Promise<boolean> {
        const { uid } = req.session;

        const post = await Post.findOne(postId);
        const receiverId = post?.userId;

        await getConnection().transaction(async (tm) => {
            await tm.query(
                `
                    insert into comment ("userId", "postId", text)
                    values ($1, $2, $3)
                `, [uid, postId, text]
            );

            await tm.query(
                `
                    update post
                    set "numComments" = "numComments" + 1
                    where id = $1
                `, [postId]
            );

            if(receiverId === uid) {
                return;
            }

            await tm.query(
                `
                    insert into notification ("receiverId", "senderId", "postId", "type")
                    values  ($1, $2, $3, $4)
                `, [receiverId, uid, postId, "comment"]
            );
        }) ;      

        return true;
    }

    @Query(() => [User])
    async likers(
        @Arg('postId', () => Int) postId: number
    ) : Promise<[User]> {
        const result = await getConnection().query(
            `
                select u.* from "user" as u
                inner join "like" on "like"."userId" = u.id
                and "like"."postId" = $1
            `, [postId]
        );

        return result;
    }   

    @Query(() => Post)
    async post (
        @Arg('postId', () => Int) postId: number
    ) : Promise<Post | undefined> {
        return Post.findOne(postId);
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async likePost(
        @PubSub() pubSub: PubSubEngine,
        @Arg('postId', () => Int) postId: number,
        @Ctx() { req } : MyContext
    ) : Promise<boolean> {
        const { uid } = req.session;

        const like = await Like.findOne({ userId: uid, postId });
        const post = await Post.findOne(postId);
        const receiverId = post?.userId;

        if(like) {
            await getConnection().transaction(async (tm) => {   
                await tm.query(
                    `
                        delete from "like"
                        where "userId" = $1 and
                        "postId" = $2
                    `, [uid, postId]
                );
    
                await tm.query(
                    `
                        update post
                        set "numLikes" = "numLikes" - 1
                        where id = $1
                    `, [postId]
                );

                if(receiverId === uid) {
                    return;
                }

                await tm.query(
                    `
                        delete from notification as n
                        where n."senderId" = $1 and n."receiverId" = $2 and
                        n."postId" = $3 and n.type = $4
                    `,[uid, receiverId, postId, 'like']
                );
            });

            return true;
        }

        await getConnection().transaction(async (tm) => {   
            await tm.query(
                `
                    insert into "like" ("userId", "postId")
                    values ($1, $2)
                `, [uid, postId]
            );

            await tm.query(
                `
                    update post
                    set "numLikes" = "numLikes" + 1
                    where id = $1
                `, [postId]
            );

            if(receiverId === uid) {
                return;
            }
            await tm.query(
                `
                    insert into notification 
                    ("receiverId", "senderId", "postId", "type")
                    values  ($1, $2, $3, $4)
                `, [receiverId, uid, postId, "like"]
            );
        });
        
        await pubSub.publish(NEW_LIKE_EVENT, {
            receiverId,
            senderId: uid,
            postId
        });
        
        return true;
    }

    @Mutation(() => Post)
    @UseMiddleware(isAuth)
    async editPost(
        @Arg('newContent') newContent: string,
        @Arg('postId', () => Int) postId: number
    ) : Promise<Post | undefined> { 
        await getConnection().query(
            `
                update post 
                set content = $1
                where id = $2
            `, [newContent, postId]
        );

        const post = await Post.findOne(postId);
        return post;
    }

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async deletePost(
        @Arg("postId", () => Int) postId: number
    ) {
        await getConnection().query(
            `delete from post where post.id = ${postId}`
        );

        return true;
    }

    @Query(() => PaginatedPosts)
    async userPosts(
        @Arg('userId', () => Int) userId: number,
        @Arg('cursor' , () => String, { nullable: true }) cursor: string | null,
        @Arg('limit', () => Int) limit: number
    ) : Promise<PaginatedPosts> {
        const realLimit = Math.min(limit, 50);
        let date;

        if(cursor) {
            date = new Date(parseInt(cursor));
        }

        const posts = await getConnection().query(
            `
                select * from post
                where post."userId" = ${userId}
                ${cursor? `and post."createdAt" < $2` : ``}
                order by post."createdAt" DESC
                limit $1
            `, 
            cursor? [realLimit + 1, date] : [realLimit + 1]
        );

        return {
            hasMore: posts.length === realLimit + 1,
            posts: posts.slice(0, realLimit)
        }
    }

    @Query(() => PaginatedPosts)
    async posts(
        @Arg('cursor' , () => String, { nullable: true }) cursor: string | null,
        @Arg('limit', () => Int) limit: number,
        @Ctx() { req } : MyContext
    ) : Promise<PaginatedPosts> {
        const { uid } = req.session;
        const realLimit = Math.min(limit, 50);
        let date;

        if(cursor) {
            date = new Date(parseInt(cursor));
        }

        const posts = await getConnection().query(
            `
              select p.* from post as p
              inner join "user" as u on p."userId" = u.id
              left outer join friend as f on u.id = f."senderId" or u.id = f."receiverId"
              where ((f."senderId" = $2 or f."receiverId" = $2) and f.status = true)
              or p."userId" = $2
              ${cursor? `and p."createdAt" < $3` : ``}
              order by p."createdAt" DESC
              limit $1
            `, 
            cursor? [realLimit + 1, uid, date] : [realLimit + 1, uid]
        );

        return {
            hasMore: posts.length === realLimit + 1,
            posts: posts.slice(0, realLimit)
        }
    }

    @Mutation(() => Post)
    @UseMiddleware(isAuth)
    async createPost(
        @Arg('content') content: string,
        @Ctx() { req } : MyContext
    ) : Promise<Post> {
        let post;
        const { uid } = req.session;

        const result = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Post)
        .values({
            userId: uid,
            content
        })
        .returning('*')
        .execute();

        post = result.raw[0];
        return post;
    }
}