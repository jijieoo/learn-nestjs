import { Exclude } from "class-transformer";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
        default: ''
    })
    username: string;

    @Column({
        nullable: false,
        default: ''
    })
    @Exclude()
    password: string;
}