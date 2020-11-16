import { Module } from '@nestjs/common';
import { UserHeroMatchRecordsController } from './user-hero-match-records.controller';
import { UserHeroMatchRecordsService } from './user-hero-match-records.service';

@Module({
    controllers: [UserHeroMatchRecordsController],
    providers: [UserHeroMatchRecordsService],
})
export class UserHeroMatchRecordsModule {}
