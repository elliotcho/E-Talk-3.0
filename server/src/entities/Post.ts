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
import { Rating } from './Rating';

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
    likes: number;

    @OneToMany(() => Rating, (rating) => rating.post)
    ratings: Rating[];

    @Field(() => String)
    @CreateDateColumn()
    createdAt : Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}