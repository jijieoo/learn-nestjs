import { IsInt } from 'class-validator';

export class CreateOrderDto {
    @IsInt()
    readonly seller_id: number;

    @IsInt()
    readonly buyer_id: number;

    @IsInt()
    readonly hero_id: number;

    @IsInt()
    readonly price: number;
}
