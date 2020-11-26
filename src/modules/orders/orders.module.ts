import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/core/entities/order.entity';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [TypeOrmModule.forFeature([Order]), UsersModule],
    providers: [OrdersService],
    exports: [OrdersService],
    controllers: [OrdersController],
})
export class OrdersModule {}
