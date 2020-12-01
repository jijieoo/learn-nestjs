import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/core/entities/user.entity';
import { UsersModule } from '../users/users.module';
import { RankingController } from './ranking.controller';
import { RankingService } from './ranking.service';

@Module({
    imports: [TypeOrmModule.forFeature([User]), UsersModule],
    controllers: [RankingController],
    providers: [RankingService],
    exports: [RankingService],
})
export class RankingModule {}
