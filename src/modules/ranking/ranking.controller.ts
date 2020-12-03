import {
    ClassSerializerInterceptor,
    Controller,
    Get,
    UseInterceptors,
} from '@nestjs/common';
import { UserRankingDto } from 'src/core/dtos/ranking/user-ranking.dto';
import { RankingService } from './ranking.service';

@Controller('ranking')
@UseInterceptors(ClassSerializerInterceptor)
export class RankingController {
    constructor(private rankingService: RankingService) {}
    @Get()
    findAll(): Promise<UserRankingDto[]> {
        return this.rankingService.findAll();
    }
}
