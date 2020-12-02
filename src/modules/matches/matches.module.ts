import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match } from 'src/core/entities/match.entity';
import { MatchesController } from './matches.controller';
import { MatchesService } from './matches.service';

@Module({
    imports: [TypeOrmModule.forFeature([Match])],
    controllers: [MatchesController],
    providers: [MatchesService],
    exports: [MatchesService],
})
export class MatchesModule {}
