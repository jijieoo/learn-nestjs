import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { UserHeroMatchRecord } from './user-hero-match-record.entity';
import { User } from './user.entity';

@Entity()
export class Hero {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
        default: '',
    })
    hero_name: string;

    @ManyToOne(
        () => User,
        user => user.heroes,
    )
    @JoinColumn({ name: 'user_id' })
    user: User;

    @OneToMany(
        () => UserHeroMatchRecord,
        record => record.hero,
    )
    match_records: UserHeroMatchRecord;
}
