import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRankingDto } from 'src/core/dtos/ranking/user-ranking.dto';
import { User } from 'src/core/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RankingService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    findAll(): Promise<UserRankingDto[]> {
        return this.userRepository.find({
            select: ['id', 'username', 'balance'],
            relations: ['heroes'],
            where: {
                role: 1,
            },
            order: {
                balance: -1,
            },
        });
    }
}
