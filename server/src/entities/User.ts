import { ObjectType, Field } from 'type-graphql';
import { 
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
} from 'typeorm';
import { Friend } from './Friend';
import { Notification } from './Notification';
import { Comment } from './Comment';
import { Post } from './Post';
import { Like } from './Like';

@ObjectType()
@Entity()
export class User extends BaseEntity{
    @Field()
    @PrimaryGeneratedColumn()
    id! : number;

    @Field()
    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string;

    @Field()
    @Column()
    firstName!: string;

    @Field()
    @Column()
    lastName!: string;

    @Field()
    @Column({ default: '' })
    profilePic: string;

    @Field()
    profileURL: string;

    @Field()
    @Column({ default: '' })
    bio: string;

    @OneToMany(() => Post, (post) => post.user)
    posts: Post[];

    @OneToMany(() => Like, (like) => like.user)
    likes: Like[];

    @OneToMany(() => Comment, (comment) => comment.user)
    comments: Comment[];

    @OneToMany(() => Friend, (friend) => friend.user)
    friends: Friend[];

    @OneToMany(() => Notification, (notification) => notification.user)
    notifications: Notification[];

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}