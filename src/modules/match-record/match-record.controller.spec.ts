import { Test, TestingModule } from '@nestjs/testing';
import { MatchRecordController } from './match-record.controller';

describe('MatchesController', () => {
    let controller: MatchRecordController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [MatchRecordController],
        }).compile();

        controller = module.get<MatchRecordController>(MatchRecordController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
