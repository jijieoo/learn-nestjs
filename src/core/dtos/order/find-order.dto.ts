import { IsNumber, IsNumberString, IsOptional } from 'class-validator';

export class FindOrderDto {
    @IsNumberString()
    @IsOptional()
    currentPage?: number;

    @IsNumberString()
    @IsOptional()
    pageSize?: number;
}
