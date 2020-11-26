import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { Hero } from './hero.entity';
import { User } from './user.entity';

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'int',
        nullable: true,
        default: 1,
    })
    price: number;

    @ManyToOne(
        () => User,
        user => user.sell_records,
    )
    @JoinColumn({ name: 'seller_id' })
    seller: User;

    @ManyToOne(
        () => User,
        user => user.buy_records,
    )
    @JoinColumn({ name: 'buyer_id' })
    buyer: User;

    @ManyToOne(
        () => Hero,
        hero => hero.transactions,
    )
    @JoinColumn({ name: 'hero_id' })
    hero: Hero;
}
