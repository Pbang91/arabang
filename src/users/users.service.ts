import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './entities/users.entity';

@Injectable()
export class UsersService {
    constructor(
      @InjectRepository(Users)
      private usersRepository: Repository<Users>,
    ) {}

    async create(user: Users): Promise<Users>{
      const result = await this.usersRepository.save(user);

      return result
    }
    
    findAll(): Promise<Users[]> {
      return this.usersRepository.find();
    }
    
    findOneBy(id: number): Promise<Users> {
      return this.usersRepository.findOneBy({ id });
    }
    
    async remove(id: string): Promise<void> {
      await this.usersRepository.delete(id);
    }
}