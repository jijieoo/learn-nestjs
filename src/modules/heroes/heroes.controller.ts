import { Controller, Get, Param } from '@nestjs/common';
import { Hero } from 'src/core/entities/hero.entity';
import { HeroesService } from './heroes.service';

@Controller('heroes')
export class HeroesController {
    constructor(private heroesService: HeroesService) {}

    @Get()
    findAll(): Promise<Hero[]> {
        return this.heroesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: number): Promise<Hero> {
        return this.heroesService.findById(id);
    }
}
