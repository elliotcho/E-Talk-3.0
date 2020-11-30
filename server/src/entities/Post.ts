import { ObjectType, Field } from 'type-graphql';
import {
   Entity,
   BaseEntity,
   PrimaryGeneratedColumn,
   Column,
   CreateDateColumn,
   UpdateDateColumn
} from 'typeorm';

@ObjectType()
@Entity()
export class Post extends BaseEntity{
    @Field()
    @PrimaryGeneratedColumn()
    id! : number;

    @Field()
    @Column()
    content!: string;

    @Field(() => String)
    @CreateDateColumn()
    createdAt : Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;
}