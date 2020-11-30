import { IsInt } from 'class-validator';

export class CheckBalanceEnoughDto {
    @IsInt()
    user_id: number;

    @IsInt()
    hero_price: number;
}
