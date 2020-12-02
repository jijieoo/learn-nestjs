import { Exclude } from 'class-transformer';
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

    @OneToMany(
        () => Hero,
        hero => hero.user,
    )
    heroes: Hero[];

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
