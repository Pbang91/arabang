import axios from 'axios';

import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { SocialEntity } from './entities/social.entity';
import { UserEntity } from 'src/users/entities/users.entity';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class SocialService {
    constructor(
        @InjectRepository(SocialEntity)
        private socialRepository: Repository<SocialEntity>,
        private dataSource: DataSource,
        private authService: AuthService,
    ){}

    async create(type: string, accessToken: string, refreshToken: string) {
        const user = await this.saveSocial(type, accessToken, refreshToken);
        // const arabangToken = this.authService.login(user.email)

        return {
            user,
            // accessToken: arabangToken
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
            
            await this.socialRepository.save(social)
            
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
                const url = 'https://kapi.kakao.com/v2/user/me'
                let userProfile;
                const userInfo = axios.get('https://kapi.kakao.com/v2/user/me', {headers: {Authorization: `Bearer ${accessToken}`}}).then((res) => {
                console.log(res);
                return res
                }).then(res => {
                    console.log(res);
                    userProfile = res.data
                });

                console.log(userInfo);

                if (!userInfo) throw new BadRequestException();
                
                // const userProfile = userInfo.data.kakao_account;

                const userData = {
                    email: userProfile.email,
                    image: userProfile.profile.thumbnail_image_url,
                    name: userProfile.name,
                    phone: userProfile.phone_number?userProfile.phone_number:null,
                }

                return userData
            
            default:
                throw new BadRequestException();
        }
    }
}
