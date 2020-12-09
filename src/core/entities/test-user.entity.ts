import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TestUser {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
        default: 'unknown',
    })
    username: string;
}
