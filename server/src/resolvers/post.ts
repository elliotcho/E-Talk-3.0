import { 
    Arg,
    Ctx,
    FieldResolver,
    Int,
    Mutation,
    Query,
    Resolver, 
    Root, 
    UseMiddleware
} from "type-graphql";
import { isAuth } from "../middleware/isAuth";
import { Like } from '../entities/Like';
import { Post } from '../entities/Post';
import { User } from '../entities/User';
import { MyContext } from '../types';
import { getConnection } from "typeorm";

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

    @Mutation(() => Boolean)
    @UseMiddleware(isAuth)
    async createComment(
        @Arg('postId', () => Int) postId: number,
        @Arg('text') text: string, 
        @Ctx() { req } : MyContext
    ) : Promise<boolean> {
        const { uid } = req.session;

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
        }) ;      

        return true;
    }

    @Query(() => [User])
    async likers(
        @Arg('postId', () => Int) postId: number
    ) : Promise<[User]> {
        const result = await getConnection().query(
            `
                select id, "firstName", "lastName", "profilePic" from "user" 
                inner join "like" on "like"."userId" = "user".id
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
        @Arg('postId', () => Int) postId: number,
        @Ctx() { req } : MyContext
    ) : Promise<boolean> {
        const { uid } = req.session;
        const like = await Like.findOne({ userId: uid, postId });

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
                )
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
            )
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

    @Query(() => [Post])
    async userPosts(
        @Ctx() { req } : MyContext
    ) : Promise<Post[]> {
        const posts = await getConnection().query(
            `
                select * from post
                where post."userId" = $1
                order by post."createdAt" DESC
            `, [req.session.uid]
        );

        return posts;
    }

    @Query(() => [Post])
    async posts() : Promise<Post[]> {
        const posts = await getConnection().query(
            `
              select * from post
              order by post."createdAt" DESC
            `
        );

        return posts;
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
            .values({ content, userId: uid })
            .returning('*')
            .execute();

        post = result.raw[0];
        return post;
    }
}