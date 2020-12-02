import {
    ClassSerializerInterceptor,
    Controller,
    Get,
    UseInterceptors,
} from '@nestjs/common';
import { MatchDay } from 'src/core/entities/match-day.entity';
import { MatchRecordService } from './match-record.service';

@Controller('match-record')
@UseInterceptors(ClassSerializerInterceptor)
export class MatchRecordController {
    constructor(private matchRecordService: MatchRecordService) {}

    @Get()
    findAll(): Promise<MatchDay[]> {
        return this.matchRecordService.findAll();
    }
}
