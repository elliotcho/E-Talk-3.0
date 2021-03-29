import { ObjectType, Field } from 'type-graphql';
import {
   Entity,
   BaseEntity,
   PrimaryGeneratedColumn,
   Column,
   CreateDateColumn,
   UpdateDateColumn,
   OneToMany,
} from 'typeorm';
import { Member } from './Member';
import { Message } from './Message';

@ObjectType()
@Entity()
export class Chat extends BaseEntity{
    @Field()
    @PrimaryGeneratedColumn()
    id! : number;

    @Field()
    @Column()
    isPrivate: boolean;

    @Field()
    title: string;

    @Field(() => String)
    @CreateDateColumn()
    createdAt : Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Member, (member) => member.chat)
    members: Member[];
    
    @Field(() => [Message])
    @OneToMany(() => Message, (message) => message.chat)
    messages: Message[];
}