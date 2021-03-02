import { Field } from "type-graphql";
import { 
    BaseEntity, 
    Column, 
    CreateDateColumn, 
    Entity, 
    ManyToOne, 
    PrimaryColumn,
    UpdateDateColumn
} from "typeorm";
import { User } from './User';
import { Post } from './Post';

@Entity()
export class Comment extends BaseEntity {
    @PrimaryColumn()
    userId: number;

    @PrimaryColumn()
    postId: number;

    @ManyToOne(() => User, user => user.comments)
    user: User;

    @ManyToOne(() => Post, (post) => post.comments, {
        onDelete: 'CASCADE'
    })
    post: Post;

    @Field()
    @Column()
    text: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}