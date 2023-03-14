import axios from 'axios';

import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { SocialEntity } from './entities/social.entity';
import { UserEntity } from 'src/users/entities/users.entity';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class SocialService {
    constructor(
        @InjectRepository(SocialEntity)
        // private socialRepository: Repository<SocialEntity>,
        private dataSource: DataSource,
        private authService: AuthService,
    ){}

    async create(createUserDto: CreateUserDto) {
        const { type, accessToken, refreshToken } = createUserDto;
        const user = await this.saveSocial(type, accessToken, refreshToken);
        const arabangToken = await this.authService.login(user.email);

        return {
            user,
            accessToken: arabangToken
        }
    }

    async saveSocial(type: string, accessToken: string, refreshToken: string): Promise<UserEntity>{
        const queryRunner = this.dataSource.createQueryRunner();
        const user = new UserEntity();
        const social = new SocialEntity();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            social.type = type;
            social.access_token = accessToken;
            social.refresh_token = refreshToken;
            
            await queryRunner.manager.save(social)
            
            const userData = await this.getUserInformation(type, accessToken);
            
            switch(type) {
                case 'kakao':
                    user.email = userData.email;
                    user.image = userData.image;
                    user.name = userData.name;
                    user.phone = userData.phone;
                }
                
            await queryRunner.commitTransaction();

            return user

        } catch (e) {
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }
    }

    async getUserInformation(type: string, accessToken: string) {
        switch(type) {
            case 'kakao':
                const url = 'https://kapi.kakao.com/v2/user/me';

                const result = await axios.get(url, {
                    headers: {"Authorization": `Bearer ${accessToken}`}
                });
                
                if (result.status !== 200) {
                    throw new UnauthorizedException();
                }

                const userInfo = result.data;

                const userData = {
                    email: userInfo.kakao_account.email,
                    image: userInfo.kakao_account.profile.thumbnail_image_url,
                    name: userInfo.name,
                    phone: userInfo.kakao_account.phone_number?userInfo.kakao_account.phone_number:null,
                }

                return userData
            
            default:
                throw new BadRequestException();
        }
    }
}
