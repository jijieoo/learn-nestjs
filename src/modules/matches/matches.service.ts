import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Match } from 'src/core/entities/match.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MatchesService {
    constructor(
        @InjectRepository(Match)
        private matchesRepository: Repository<Match>,
    ) {}

    findAll(): Promise<Match[]> {
        return this.matchesRepository.find({
            relations: [
                'match_records',
                'match_records.user',
                'match_records.hero',
            ],
        });
    }
}
