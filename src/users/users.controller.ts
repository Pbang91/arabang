import { Body, Controller, Get, Post } from '@nestjs/common';
import { Users } from './users.entity';
import { UsersService } from './users.service';
import { ApiTags, ApiOperation, ApiResponse, ApiCreatedResponse } from '@nestjs/swagger';

@Controller('users')
@ApiTags('User')
export class UsersController {
    constructor(private readonly usersService: UsersService){}
    
    @Get()
    @ApiOperation({summary: '전체 유저 조회 API', description: '전체 유저를 조회합니다.'})
    @ApiResponse({description: '전체 유저의 정보를 Array 형태로 반환합니다.', type: [Users], status: 200})
    findAll(){
        return this.usersService.findAll()
    }

    @Post()
    @ApiOperation({summary: '신규 유저 생성 API', description: '신규 유저를 생성합니다.'})
    @ApiCreatedResponse({description: '신규 생성한 유저의 정보를 반환합니다.', type: Users})
    create(@Body() user: Users){
        this.usersService.create(user);

        return Object.assign({
            data: {...user},
            statusCode: 201,
            statusMsg: 'user saved success'
        })
    }
}
