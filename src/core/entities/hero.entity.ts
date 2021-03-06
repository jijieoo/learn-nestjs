import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { MatchRecord } from './match-record.entity';
import { Order } from './order.entity';
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
        () => MatchRecord,
        record => record.hero,
    )
    match_records: MatchRecord[];

    @OneToMany(
        () => Order,
        transaction => transaction.hero,
    )
    transactions: Order[];
}
