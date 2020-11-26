import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../core/entities/user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) {}

    findAll(): Promise<User[]> {
        return this.usersRepository.find({
            relations: ['heroes', 'match_records', 'buy_records'],
        });
    }

    findByUsername(username: string): Promise<User> {
        return this.usersRepository.findOne({ username });
    }

    findOne(id: number): Promise<User> {
        return this.usersRepository.findOne(id);
    }

    async remove(id: string): Promise<void> {
        await this.usersRepository.delete(id);
    }
}
