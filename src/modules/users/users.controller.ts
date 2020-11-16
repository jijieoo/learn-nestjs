import {
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    Param,
    UseInterceptors,
} from '@nestjs/common';
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

    @Get(':id')
    findOne(@Param('id') id: number): Promise<User> {
        return this.usersService.findOne(id);
    }

    @Delete(':id')
    remove(@Param('id') id): void {
        this.remove(id);
    }
}
