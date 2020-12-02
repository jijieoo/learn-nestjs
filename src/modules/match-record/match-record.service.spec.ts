import { Test, TestingModule } from '@nestjs/testing';
import { MatchRecordService } from './match-record.service';

describe('MatchesService', () => {
    let service: MatchRecordService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [MatchRecordService],
        }).compile();

        service = module.get<MatchRecordService>(MatchRecordService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
