import { Exclude, Expose } from 'class-transformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Hero } from './hero.entity';
import { MatchRecord } from './match-record.entity';
import { Order } from './order.entity';

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

    @Column({
        type: 'int',
        nullable: false,
        default: 5,
    })
    balance: number;

    @Column({
        type: 'tinyint',
        nullable: false,
        default: 1,
        comment: '0: 管理员, 1: 选手',
    })
    role: number;

    @Expose()
    get total(): number {
        return this.match_records.length;
    }

    @Expose()
    get wins(): number {
        return this.match_records.filter(
            record => record.match.winner_side === record.camp,
        ).length;
    }

    @Expose()
    get losses(): number {
        return this.total - this.wins;
    }

    @OneToMany(
        () => Hero,
        hero => hero.user,
    )
    heroes: Hero[];

    @Exclude()
    @OneToMany(
        () => MatchRecord,
        record => record.user,
    )
    match_records: MatchRecord[];

    @OneToMany(
        () => Order,
        transaction => transaction.buyer,
    )
    buy_records: Order[];

    @OneToMany(
        () => Order,
        transaction => transaction.seller,
    )
    sell_records: Order[];
}
