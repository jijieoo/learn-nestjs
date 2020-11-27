import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto } from 'src/core/dtos/order/create-order.dto';
import { Order } from 'src/core/entities/order.entity';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private ordersRepository: Repository<Order>,
        private usersService: UsersService,
    ) {}

    findAll(): Promise<Order[]> {
        return this.ordersRepository.find({
            relations: ['seller', 'buyer', 'hero', 'hero.user'],
        });
    }

    /**
     * 创建新交易记录
     * @param {CreateOrderDto} createOrderDto 交易记录
     */
    async create(createOrderDto: CreateOrderDto): Promise<Order> {
        const isEnough = await this.usersService.checkUserBalanceIsEnough(
            createOrderDto.buyer_id,
            createOrderDto.price,
        );
        if (isEnough) {
            const order = await this.ordersRepository.save(createOrderDto);

            await this.usersService.buyHero(
                order.id,
                createOrderDto.buyer_id,
                createOrderDto.hero_id,
                createOrderDto.price,
            );

            await this.usersService.sellHero(
                order.id,
                createOrderDto.seller_id,
                createOrderDto.price,
            );
            return order;
        } else {
            throw new HttpException('user balance is not enough', 200);
        }
    }
}
