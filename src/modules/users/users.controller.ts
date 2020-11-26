import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from 'src/core/dtos/user/create-user.dto';
import { User } from '../../core/entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Post()
    create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.usersService.create(createUserDto);
    }

    @Get(':id')
    findOne(@Param('id') id: number): Promise<User> {
        return this.usersService.findOne(id);
    }

    @Delete(':id')
    remove(@Param('id') id): void {
        this.remove(id);
    }
}
