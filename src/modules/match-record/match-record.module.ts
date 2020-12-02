import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchDay } from 'src/core/entities/match-day.entity';
import { MatchRecordController } from './match-record.controller';
import { MatchRecordService } from './match-record.service';

@Module({
    imports: [TypeOrmModule.forFeature([MatchDay])],
    controllers: [MatchRecordController],
    providers: [MatchRecordService],
    exports: [MatchRecordService],
})
export class MatchRecordModule {}
