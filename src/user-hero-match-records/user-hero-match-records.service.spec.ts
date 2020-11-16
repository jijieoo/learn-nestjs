import { Test, TestingModule } from '@nestjs/testing';
import { UserHeroMatchRecordsService } from './user-hero-match-records.service';

describe('UserHeroMatchRecordsService', () => {
  let service: UserHeroMatchRecordsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserHeroMatchRecordsService],
    }).compile();

    service = module.get<UserHeroMatchRecordsService>(UserHeroMatchRecordsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
