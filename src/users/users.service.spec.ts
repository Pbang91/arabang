import { Test, TestingModule } from '@nestjs/testing';
import { Users } from './users.entity';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);    
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // describe('findAll', () => {
  //   it('should return an array', () => {
  //     service.create()
  //   })
  // })

});