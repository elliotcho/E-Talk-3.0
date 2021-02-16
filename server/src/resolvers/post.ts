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