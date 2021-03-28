import { ObjectType, Field } from 'type-graphql';
import {
   Entity,
   BaseEntity,
   PrimaryColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Member extends BaseEntity{
    @Field()
    @PrimaryColumn()
    userId: number;

    @Field()
    @PrimaryColumn()
    chatId: number;
}