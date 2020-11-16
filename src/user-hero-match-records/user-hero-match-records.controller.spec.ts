import { Test, TestingModule } from '@nestjs/testing';
import { UserHeroMatchRecordsController } from './user-hero-match-records.controller';

describe('UserHeroMatchRecordsController', () => {
  let controller: UserHeroMatchRecordsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserHeroMatchRecordsController],
    }).compile();

    controller = module.get<UserHeroMatchRecordsController>(UserHeroMatchRecordsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
