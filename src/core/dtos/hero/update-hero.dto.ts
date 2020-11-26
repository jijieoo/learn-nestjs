import { IsInt, IsOptional, IsString } from 'class-validator';
export class UpdateHeroDto {
    @IsInt()
    id: number;

    @IsString()
    @IsOptional()
    hero_name: string;

    @IsInt()
    @IsOptional()
    user_id: number;
}
