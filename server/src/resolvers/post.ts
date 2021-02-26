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
    @FieldResolver(() => User) 
    async user(
        @Root() post: Post
    ) : Promise<User | undefined> {
        return User.findOne(post.userId);
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
        const like = await Like.find({ userId: uid, postId });

        if(like) {
            await Like.delete({ userId: uid, postId });
            return true;
        }

        await getConnection().query(
            `
                insert into like ("postId", "userId")
                values ($1, $2)
            `, [postId, uid]
        );

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