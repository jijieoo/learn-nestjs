import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTestUserDto } from 'src/core/dtos/test-user/create-test-user.dto';
import { TestUser } from 'src/core/entities/test-user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TestUsersService {
    constructor(
        @InjectRepository(TestUser)
        private testUserRepository: Repository<TestUser>,
    ) {}

    async addUser(createTestUserDto: CreateTestUserDto): Promise<boolean> {
        const newTestUser = await this.testUserRepository.save(
            createTestUserDto,
        );
        console.log(newTestUser);
        if (newTestUser) {
            return true;
        } else {
            return false;
        }
    }

    findAll(): Promise<TestUser[]> {
        return this.testUserRepository.find();
    }
}
