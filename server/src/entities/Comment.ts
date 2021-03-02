import { 
    BaseEntity, 
    CreateDateColumn, 
    Entity, 
    PrimaryColumn,
    UpdateDateColumn
} from "typeorm";

@Entity()
export class Comment extends BaseEntity {
    @PrimaryColumn()
    userId: number;

    @PrimaryColumn()
    postId: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}