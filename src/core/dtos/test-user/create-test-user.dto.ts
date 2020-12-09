import { IsString } from 'class-validator';

export class CreateTestUserDto {
    @IsString()
    username: string;
}
