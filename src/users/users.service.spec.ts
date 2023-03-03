import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Users } from './users.entity';
import { UsersService } from './users.service';

const mockUsersRepository = () => ({
  create: jest.fn(),
  findAll: jest.fn(),
  findOneBy: jest.fn(),
  remove: jest.fn()
});

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('UsersService', () => {
  let service: UsersService;
  let repository: MockRepository<Users>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(Users),
          useValue: mockUsersRepository(),
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);    
    repository = module.get<MockRepository<Users>>(getRepositoryToken(Users));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Create', () => {
    const createArgs = new Users()
    createArgs.email = 'test@test.com'
    createArgs.kakaoId = 'testKakakoId'
    createArgs.image = 'https://test.image.url'
    createArgs.firstName = 'test',
    createArgs.lastName = 'Man'
    
    it('should create Users', async () => {
      // when
      repository.create.mockResolvedValue(createArgs);
      
      // then
      // expect(repository.create).toHaveBeenCalledTimes(1);
      // const result = service.create(createArgs);
      const newUser = await service.findOneBy(1)
      console.log(newUser);
      expect(newUser.email).toEqual(createArgs.email);

      // console.log(result);
      // expect(repository.create).toHaveBeenCalledWith(createArgs);

      // expect(result).toEqual(createArgs);
    })
  })
});