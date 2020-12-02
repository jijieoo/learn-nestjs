import { Exclude, Expose } from 'class-transformer';
import * as dayjs from 'dayjs';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CAMP } from '../constants/camp.constant';
import { MatchRecord } from './match-record.entity';

@Entity()
export class Match {
    @PrimaryGeneratedColumn()
    id: number;

    @Expose()
    get start(): string {
        return dayjs(this.start_time).format('YYYY-MM-DD HH:mm');
    }

    @Exclude()
    @Column({
        type: 'bigint',
        default: new Date().getTime(),
        nullable: false,
    })
    start_time: number;

    @Exclude()
    @Column({
        type: 'bigint',
        default: new Date().getTime(),
        nullable: false,
    })
    end_time: number;

    /** 时长 */
    @Expose()
    get duration(): number {
        return this.end_time - this.start_time;
    }

    /** 天辉 */
    @Expose()
    get radiant_records(): MatchRecord[] {
        return this.match_records.filter(
            record => record.camp === CAMP.RADIANT,
        );
    }

    /** 夜魇 */
    @Expose()
    get dire_records(): MatchRecord[] {
        return this.match_records.filter(record => record.camp === CAMP.DIRE);
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

    @Exclude()
    @OneToMany(
        () => MatchRecord,
        record => record.match,
    )
    match_records: MatchRecord[];
}
