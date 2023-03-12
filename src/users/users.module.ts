import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UserEntity } from './entities/users.entity';
import { UsersService } from './users.service';
import { SocialModule } from 'src/social/social.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        SocialModule
    ],
    providers: [UsersService],
    controllers: [UsersController],
})
export class UsersModule {}