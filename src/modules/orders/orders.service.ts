import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto } from 'src/core/dtos/order/create-order.dto';
import { FindOrderDto } from 'src/core/dtos/order/find-order.dto';
import { PaginationResponseDto } from 'src/core/dtos/pagination/pagination-response.dto';
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

    /**
     * 分页查询
     * @param findOrderDto 分页信息
     */
    async findAll(findOrderDto: FindOrderDto): Promise<PaginationResponseDto> {
        const currentPage = findOrderDto.currentPage
            ? findOrderDto.currentPage
            : 1;
        const pageSize = findOrderDto.pageSize ? findOrderDto.pageSize : 50;

        const skip = (currentPage - 1) * pageSize;

        const findAndCount = await this.ordersRepository.findAndCount({
            relations: ['seller', 'buyer', 'hero', 'hero.user'],
            skip,
            take: pageSize,
            where: {
                buyer: {},
            },
        });

        const result = new PaginationResponseDto(
            currentPage,
            pageSize,
            findAndCount[1],
            findAndCount[0],
        );

        return result;
    }

    /**
     * 创建新交易记录
     * @param {CreateOrderDto} createOrderDto 交易记录
     */
    async create(createOrderDto: CreateOrderDto): Promise<Order> {
        try {
            await this.usersService.checkUserBalanceIsEnough(
                createOrderDto.buyer_id,
                createOrderDto.price,
            );

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
        } catch (err) {
            throw err;
        }
    }
}
