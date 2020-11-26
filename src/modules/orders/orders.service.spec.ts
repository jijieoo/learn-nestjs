import { Test, TestingModule } from '@nestjs/testing';
import { UserHeroTransactionsService } from './orders.service';

describe('TransactionsService', () => {
    let service: UserHeroTransactionsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UserHeroTransactionsService],
        }).compile();

        service = module.get<UserHeroTransactionsService>(
            UserHeroTransactionsService,
        );
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
