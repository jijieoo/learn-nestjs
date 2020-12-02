import {
    ClassSerializerInterceptor,
    Controller,
    Get,
    UseInterceptors,
} from '@nestjs/common';
import { Match } from 'src/core/entities/match.entity';
import { MatchesService } from './matches.service';

@Controller('matches')
@UseInterceptors(ClassSerializerInterceptor)
export class MatchesController {
    constructor(private matchesService: MatchesService) {}

    @Get()
    findAll(): Promise<Match[]> {
        return this.matchesService.findAll();
    }
}
