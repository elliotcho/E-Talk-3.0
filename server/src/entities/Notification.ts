import { Field, ObjectType } from 'type-graphql';
import { 
    BaseEntity,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryColumn,
    UpdateDateColumn
} from 'typeorm';
import { User } from './User';

@ObjectType()
@Entity()
export class Notification extends BaseEntity {
    @Field()
    @PrimaryColumn()
    senderId: number;

    @Field()
    @PrimaryColumn()
    receiverId: number;

    @Field()
    @PrimaryColumn()
    type: string;

    @Field()
    @PrimaryColumn({ default: 0 })
    postId: number;

    @Field(() => User)
    @ManyToOne(() => User, user => user.notifications)
    user: User;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;
}