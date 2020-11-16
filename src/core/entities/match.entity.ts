import { Expose } from 'class-transformer';
import dayjs from 'dayjs';
import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { UserHeroMatchRecord } from './user-hero-match-record.entity';

@Entity()
export class Match {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    start_time: Date;

    @CreateDateColumn()
    end_time: Date;

    @Expose()
    get duration(): number {
        return (
            dayjs(this.end_time).valueOf() - dayjs(this.start_time).valueOf()
        );
    }

    @Column({
        type: 'tinyint',
        comment: '0: 天辉胜利, 1: 夜魇胜利',
        nullable: true,
    })
    winner_side: number;

    @OneToMany(
        () => UserHeroMatchRecord,
        record => record.match,
    )
    match_records: UserHeroMatchRecord;
}
