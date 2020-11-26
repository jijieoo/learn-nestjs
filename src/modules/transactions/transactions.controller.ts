import {
    ClassSerializerInterceptor,
    Controller,
    Get,
    UseInterceptors,
} from '@nestjs/common';
import { UserHeroTransaction } from 'src/core/entities/user-hero-transaction.entity';
import { TransactionsService } from './transactions.service';

@Controller('transactions')
@UseInterceptors(ClassSerializerInterceptor)
export class TransactionsController {
    constructor(private transactionsService: TransactionsService) {}

    @Get()
    findAll(): Promise<UserHeroTransaction[]> {
        return this.transactionsService.findAll();
    }
}
