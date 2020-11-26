import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Get,
    Post,
    UseInterceptors,
} from '@nestjs/common';
import { CreateOrderDto } from 'src/core/dtos/order/create-order.dto';
import { Order } from 'src/core/entities/order.entity';
import { OrdersService } from './orders.service';

@Controller('user-hero-transactions')
@UseInterceptors(ClassSerializerInterceptor)
export class OrdersController {
    constructor(private ordersService: OrdersService) {}

    @Get()
    findAll(): Promise<Order[]> {
        return this.ordersService.findAll();
    }

    @Post()
    create(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
        return this.ordersService.create(createOrderDto);
    }
}
