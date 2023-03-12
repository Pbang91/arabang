import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/users.entity';
import { UsersService } from './users.service';

const mockUsersRepository = () => ({
  save: jest.fn(),
  findAll: jest.fn(),
  findOneBy: jest.fn(),
  remove: jest.fn()
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('UsersService', () => {
  let service: UsersService;
  let repository: MockRepository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockUsersRepository(),
        },
      ],
    }).compile();

    service = module.get(UsersService);    
    repository = module.get(getRepositoryToken(UserEntity));
  });

  describe('Create', () => {
    const reqeustArgs = new UserEntity()
    
    reqeustArgs.email = 'test@test.com';
    reqeustArgs.image = 'https://test.image.url';
    reqeustArgs.name = 'test';
    
    const savedArgs = reqeustArgs;
    
    savedArgs._id = 1;
    
    it('should create Users', async () => {
      // when
      repository.save.mockResolvedValue(savedArgs); 
      
      const result = await service.create(reqeustArgs);

      // then
      expect(repository.save).toHaveBeenCalledTimes(1);
      expect(repository.save).toHaveBeenCalledWith(savedArgs);
      expect(result.email).toEqual(reqeustArgs.email);

      expect(result).toEqual(savedArgs);
    })
  })
});