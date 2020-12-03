import { Exclude, Expose } from 'class-transformer';
import dayjs from 'dayjs';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { CAMP } from '../constants/camp.constant';
import { TimeConstants } from '../constants/time.constant';
import { MatchDay } from './match-day.entity';
import { MatchRecord } from './match-record.entity';

@Entity()
export class Match {
    @PrimaryGeneratedColumn()
    id: number;

    /** 开始时间 */
    @Expose()
    get start(): string {
        return dayjs(Number(this.start_time)).format(TimeConstants.TIME_FORMAT);
    }

    /** 结束时间 */
    @Expose()
    get end(): string {
        return dayjs(Number(this.end_time)).format(TimeConstants.TIME_FORMAT);
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
    get duration(): string {
        const interval = this.end_time - this.start_time;
        return `${Math.floor(
            interval / TimeConstants.MILLISECONDS_PER_MINUTE,
        )}min`;
    }

    /** 天辉 */
    @Expose()
    get radiant_records(): MatchRecord[] {
        return this.match_records
            .filter(record => record.camp === CAMP.RADIANT)
            .sort((a, b) => a.position - b.position);
    }

    /** 夜魇 */
    @Expose()
    get dire_records(): MatchRecord[] {
        return this.match_records
            .filter(record => record.camp === CAMP.DIRE)
            .sort((a, b) => a.position - b.position);
    }

    /** 胜利方 */
    @Column({
        type: 'tinyint',
        comment: '0: 天辉胜利, 1: 夜魇胜利',
        nullable: true,
    })
    winner_side: number;

    /** 场次 */
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

    @ManyToOne(
        () => MatchDay,
        day => day.matches,
    )
    @JoinColumn({ name: 'match_day_id' })
    matchDay: MatchDay;
}
