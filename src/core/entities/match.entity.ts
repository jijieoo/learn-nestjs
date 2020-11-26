import { Expose } from 'class-transformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserHeroMatchRecord } from './user-hero-match-record.entity';

@Entity()
export class Match {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'bigint',
        default: new Date().getTime(),
        nullable: false,
    })
    start_time: number;

    @Column({
        type: 'bigint',
        default: new Date().getTime(),
        nullable: false,
    })
    end_time: number;

    @Expose()
    get duration(): number {
        return this.end_time - this.start_time;
    }

    @Column({
        type: 'tinyint',
        comment: '0: 天辉胜利, 1: 夜魇胜利',
        nullable: true,
    })
    winner_side: number;

    @Column({
        type: 'int',
    })
    games: number;

    @OneToMany(
        () => UserHeroMatchRecord,
        record => record.match,
    )
    match_records: UserHeroMatchRecord;
}
