import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { SocialEntity } from './entities/social.entity';
import { SocialService } from './social.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([SocialEntity]),
        AuthModule
    ],
    providers: [SocialService],
    exports: [SocialService]
})
export class SocialModule {}
