import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MatchDay } from 'src/core/entities/match-day.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MatchRecordService {
    constructor(
        @InjectRepository(MatchDay)
        private matchDayRepository: Repository<MatchDay>,
    ) {}

    findAll(): Promise<MatchDay[]> {
        return this.matchDayRepository.find({
            relations: [
                'matches',
                'matches.match_records',
                'matches.match_records.user',
                'matches.match_records.user.match_records',
                'matches.match_records.user.match_records.match',
                'matches.match_records.hero',
            ],
        });
    }
}
