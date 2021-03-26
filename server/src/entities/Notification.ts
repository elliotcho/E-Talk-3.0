import { Field, ObjectType } from 'type-graphql';
import { 
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn
} from 'typeorm';

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

    @Field()
    @Column({ default: false })
    read: boolean;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;
}