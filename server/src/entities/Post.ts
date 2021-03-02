import { ObjectType, Field } from 'type-graphql';
import {
   Entity,
   BaseEntity,
   PrimaryGeneratedColumn,
   Column,
   CreateDateColumn,
   UpdateDateColumn,
   ManyToOne,
   OneToMany
} from 'typeorm';
import { User } from './User';
import { Like } from './Like';

@ObjectType()
@Entity()
export class Post extends BaseEntity{
    @Field()
    @PrimaryGeneratedColumn()
    id! : number;

    @Field()
    @Column()
    content!: string;

    @Field()
    @Column()
    userId: number;

    @Field(() => User)
    @ManyToOne(() => User, (user) => user.posts, {
        onDelete: 'CASCADE'
    })
    user: User;

    @Field()
    @Column({ default: 0 })
    numLikes: number;

    @OneToMany(() => Like, (like) => like.post)
    likes: Like[];

    @Field(() => String)
    @CreateDateColumn()
    createdAt : Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}