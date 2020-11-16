import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Hero } from './hero.entity';
import { Match } from './match.entity';
import { User } from './user.entity';

@Entity()
export class UserHeroMatchRecord {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'tinyint',
        comment: '0: 天辉, 1: 夜魇',
        nullable: false,
    })
    camp: number;

    @ManyToOne(
        () => User,
        user => user.match_records,
    )
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(
        () => Hero,
        hero => hero.match_records,
    )
    @JoinColumn({ name: 'hero_id' })
    hero: Hero;

    @ManyToOne(
        () => Match,
        match => match.match_records,
    )
    @JoinColumn({ name: 'match_id' })
    match: Match;
}
