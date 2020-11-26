import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserHeroTransaction } from 'src/core/entities/user-hero-transaction.entity';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';

@Module({
    imports: [TypeOrmModule.forFeature([UserHeroTransaction])],
    providers: [TransactionsService],
    exports: [TransactionsService],
    controllers: [TransactionsController],
})
export class TransactionsModule {}
