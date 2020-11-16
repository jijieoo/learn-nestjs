import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hero } from 'src/core/entities/hero.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HeroesService {
    constructor(
        @InjectRepository(Hero)
        private heroesRepository: Repository<Hero>,
    ) {}

    findAll(): Promise<Hero[]> {
        return this.heroesRepository.find();
    }

    findByHeroName(hero_name: string): Promise<Hero> {
        return this.heroesRepository.findOne({ hero_name });
    }

    findById(id: number): Promise<Hero> {
        return this.heroesRepository.findOne(id);
    }
}
