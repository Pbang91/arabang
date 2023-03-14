import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserEntity } from './entities/users.entity';
import { UsersService } from './users.service';
import { ApiTags, ApiOperation, ApiResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('users')
@ApiTags('User')
export class UsersController {
    constructor(private readonly usersService: UsersService){}
    
    @Get()
    @ApiOperation({summary: '전체 유저 조회 API', description: '전체 유저를 조회합니다.'})
    @ApiResponse({description: '전체 유저의 정보를 Array 형태로 반환합니다.', type: [UserEntity], status: 200})
    findAll(){
        return this.usersService.findAll()
    }

    // @Get(':id')
    // @ApiOperation({summary: '유저 조회 API', description: '유저 ID를 통해 해당 유저를 조회합니다.'})
    // @ApiResponse({description: '조회한 유저의 정보를 반환합니다.', type: UserEntity, status: 200})
    // findOneBy(@Param('id') id : number){
    //     return this.usersService.findOneBy(id)
    // }

    @Post()
    @ApiOperation({summary: '신규 유저 생성 API', description: '신규 유저를 생성합니다.'})
    @ApiCreatedResponse({description: '신규 생성한 유저의 토큰을 반환합니다.', type: LoginUserDto, status: 201})
    async create(@Body() createUserDto: CreateUserDto) {
        return await this.usersService.create(createUserDto);
    }
}
