import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    Post,
    Query,
    UseInterceptors,
} from '@nestjs/common';
import { CreateOrderDto } from 'src/core/dtos/order/create-order.dto';
import { FindOrderDto } from 'src/core/dtos/order/find-order.dto';
import { PaginationResponseDto } from 'src/core/dtos/pagination/pagination-response.dto';
import { Order } from 'src/core/entities/order.entity';
import { OrdersService } from './orders.service';

@Controller('orders')
@UseInterceptors(ClassSerializerInterceptor)
export class OrdersController {
    constructor(private ordersService: OrdersService) {}

    @Get()
    findAll(
        @Query() findOrderDto: FindOrderDto,
    ): Promise<PaginationResponseDto> {
        console.log(findOrderDto);
        return this.ordersService.findAll(findOrderDto);
    }

    @Post()
    create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
        return this.ordersService.create(createOrderDto);
    }
}
