import { Body, Controller, Get, Post } from '@nestjs/common';
import { Users } from './users.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService){}
    
    @Get()
    findAll(){
        return this.usersService.findAll()
    }

    @Post()
    create(@Body() user: Users){
        this.usersService.create(user);

        return Object.assign({
            data: {...user},
            statusCode: 201,
            statusMsg: 'user saved success'
        })
    }
}
