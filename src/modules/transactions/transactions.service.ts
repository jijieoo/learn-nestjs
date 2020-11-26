import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserHeroTransaction } from 'src/core/entities/user-hero-transaction.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(UserHeroTransaction)
        private userHeroTransactionRepository: Repository<UserHeroTransaction>,
    ) {}

    findAll(): Promise<UserHeroTransaction[]> {
        return this.userHeroTransactionRepository.find({
            relations: ['seller', 'buyer', 'hero', 'hero.user'],
        });
    }
}
