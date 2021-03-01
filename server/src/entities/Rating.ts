import { 
    BaseEntity,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryColumn,
    UpdateDateColumn
} from 'typeorm';
import { User } from './User';
import { Post } from './Post';

@Entity()
export class Rating extends BaseEntity {
    @PrimaryColumn()
    userId: number;

    @PrimaryColumn()
    postId: number;

    @ManyToOne(() => User, user => user.ratings)
    user: User;

    @ManyToOne(() => Post, (post) => post.ratings, {
        onDelete: 'CASCADE'
    })
    post: Post;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}