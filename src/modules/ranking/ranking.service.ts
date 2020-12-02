import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ROLE } from 'src/core/constants/role.constant';
import { SORT } from 'src/core/constants/sort.constant';
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
                role: ROLE.PLAYER,
            },
            order: {
                balance: SORT.DESC,
            },
        });
    }
}
