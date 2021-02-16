import { ObjectType, Field } from 'type-graphql';
import {
   Entity,
   BaseEntity,
   PrimaryGeneratedColumn,
   Column,
   CreateDateColumn,
   UpdateDateColumn,
   ManyToOne
} from 'typeorm';
import { User } from './User';

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

    @Field(() => String)
    @CreateDateColumn()
    createdAt : Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}