import { 
    Arg,
    Ctx,
    Field,
    FieldResolver,
    Int,
    Mutation,
    ObjectType,
    Query,
    Resolver, 
    Root, 
    UseMiddleware
} from "type-graphql";
import { isAuth } from "../middleware/isAuth";
import { Comment } from '../entities/Comment';
import { Like } from '../entities/Like';
import { Post } from '../entities/Post';
import { User } from '../entities/User';
import { MyContext } from '../types';
import { getConnection } from "typeorm";

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
        @Arg('postId', () => Int) postId: number
    ) : Promise<boolean> {
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
            )
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

    @Query(() => PaginatedPosts)
    async userPosts(
        @Arg('userId', () => Int) userId: number,
        @Arg('cursor' , () => String, { nullable: true }) cursor: string | null,
        @Arg('limit', () => Int) limit: number
    ) : Promise<PaginatedPosts> {
        const realLimit = Math.min(limit, 5);
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
        @Arg('limit', () => Int) limit: number
    ) : Promise<PaginatedPosts> {
        const realLimit = Math.min(limit, 50);
        let date;

        if(cursor) {
            date = new Date(parseInt(cursor));
        }

        const posts = await getConnection().query(
            `
              select p.* from post as p
              inner join "user" as u on p."userId" = u.id
              inner join friend as f on u.id = f."senderId" or u.id = f."receiverId"
              ${cursor? `where p."createdAt" < $2` : ``}
              where f.status = true
              order by p."createdAt" DESC
              limit $1
            `, 
            cursor? [realLimit + 1, date] : [realLimit + 1]
        );

        return {
            hasMore: posts.length === realLimit+ 1,
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