import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { Users } from './entities/users.entity';
import { UsersService } from './users.service';

@Module({
    imports: [TypeOrmModule.forFeature([Users])],
    providers: [UsersService],
    controllers: [UsersController],
})
export class UsersModule {}