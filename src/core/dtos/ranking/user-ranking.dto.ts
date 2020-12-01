import { Hero } from 'src/core/entities/hero.entity';
import { User } from 'src/core/entities/user.entity';

export class UserRankingDto extends User {
    id: number;

    username: string;

    balance: number;

    heroes: Hero[];
}
