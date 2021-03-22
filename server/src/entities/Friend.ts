import { Field } from 'type-graphql';
import { 
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryColumn,
    UpdateDateColumn
} from 'typeorm';
import { User } from './User';

@Entity()
export class Friend extends BaseEntity {
    @Field()
    @PrimaryColumn()
    senderId: number;

    @Field()
    @PrimaryColumn()
    receiverId: number;

    @Field()
    @Column({ default: false })
    status: boolean;

    @Field()
    @Column({ default: false })
    read: boolean;

    @ManyToOne(() => User, user => user.friends)
    user: User;

    @Field()
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;
}