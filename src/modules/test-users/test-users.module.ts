import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestUser } from 'src/core/entities/test-user.entity';
import { TestUsersService } from './test-users.service';

@Module({
    imports: [TypeOrmModule.forFeature([TestUser])],
    providers: [TestUsersService],
    exports: [TestUsersService],
})
export class TestUsersModule {}
