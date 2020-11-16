import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Hero } from './hero.entity';
import { UserHeroMatchRecord } from './user-hero-match-record.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
        default: '',
    })
    username: string;

    @Column({
        nullable: false,
        default: '',
    })
    @Exclude()
    password: string;

    @OneToMany(
        () => Hero,
        hero => hero.user,
    )
    heroes: Hero[];

    @OneToMany(
        () => UserHeroMatchRecord,
        record => record.user,
    )
    match_records: UserHeroMatchRecord;
}
