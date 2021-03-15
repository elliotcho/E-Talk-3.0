import { Field, ObjectType } from 'type-graphql';
import { 
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from 'typeorm';
import { User } from './User';

@ObjectType()
@Entity()
export class Notification extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    senderId: number;

    @Field()
    @Column()
    receiverId: number;

    @Field()
    @Column()
    text: string;

    @Field()
    @Column({ default: 0 })
    postId: number;

    @Field(() => User)
    @ManyToOne(() => User, user => user.notifications)
    user: User;

    @Field()
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;
}