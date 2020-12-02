import dayjs from 'dayjs';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TimeConstants } from '../constants/time.constant';
import { Match } from './match.entity';

@Entity()
export class MatchDay {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
        default: dayjs().format(TimeConstants.DATE_FORMAT),
    })
    datetime: string;

    @OneToMany(
        () => Match,
        match => match.matchDay,
    )
    matches: Match[];
}
