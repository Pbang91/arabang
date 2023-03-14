import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SocialService } from 'src/social/social.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/users.entity';

@Injectable()
export class UsersService {
    constructor(
      @InjectRepository(UserEntity)
      private usersRepository: Repository<UserEntity>,
      private socialService: SocialService
    ) {}

    async create(createUserDto: CreateUserDto) {
      const user = await this.socialService.create(createUserDto);
      await this.usersRepository.save(user.user);

      return {
        accessTokne : user.accessToken
      } 
    }
    
    findAll(): Promise<UserEntity[]> {
      return this.usersRepository.find();
    }
    
    findOneBy(email: string): Promise<UserEntity> {
      return this.usersRepository.findOneBy({email});
    }
    
    async remove(id: number): Promise<void> {
      await this.usersRepository.delete({_id:id})
    }
}