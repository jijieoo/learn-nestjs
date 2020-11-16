import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { HeroesModule } from './modules/heroes/heroes.module';
import { MatchesModule } from './modules/matches/matches.module';
import { UserHeroMatchRecordsService } from './user-hero-match-records/user-hero-match-records.service';
import { UserHeroMatchRecordsModule } from './user-hero-match-records/user-hero-match-records.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: '',
            database: 'test',
            entities: [__dirname + '/core/entities/*.entity{.ts,.js}'],
            synchronize: true,
        }),
        UsersModule,
        AuthModule,
        HeroesModule,
        MatchesModule,
        UserHeroMatchRecordsModule,
    ],
    controllers: [AppController],
    providers: [AppService, UserHeroMatchRecordsService],
})
export class AppModule {
    constructor(private connection: Connection) {}
}
