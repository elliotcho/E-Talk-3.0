import { Field, ObjectType } from "type-graphql";
import { 
    BaseEntity, 
    Column, 
    CreateDateColumn, 
    Entity, 
    ManyToOne, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn
} from "typeorm";
import { User } from './User';
import { Post } from './Post';

@ObjectType()
@Entity()
export class Comment extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    userId: number;

    @Field()
    @Column()
    postId: number;

    @Field(() => User)
    @ManyToOne(() => User, user => user.comments, {
        onDelete: 'CASCADE'
    })
    user: User;

    @ManyToOne(() => Post, (post) => post.comments, {
        onDelete: 'CASCADE'
    })
    post: Post;

    @Field()
    @Column()
    text: string;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}