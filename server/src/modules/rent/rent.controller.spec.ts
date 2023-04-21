import { Test, TestingModule } from '@nestjs/testing';
import { RentController } from './rent.controller';
import { RentService } from './rent.service';
import { getModelToken } from '@nestjs/mongoose';
import { UserService } from '../user/user.service';
import { CopyService } from '../copy/copy.service';
import { StoreService } from '../store/store.service';

jest.mock('../store/store.service');
jest.mock('./rent.service');
jest.mock('../user/user.service');
jest.mock('../copy/copy.service');

describe('RentController', () => {
  let rentController: RentController;
  let rentService: RentService;
  let userService: UserService;
  let copyService: CopyService;
  let storeService: StoreService;

  const mockRepository = {
    find() {
      return {};
    },
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RentController],
      providers: [RentService, UserService, CopyService, StoreService],
    })
      .overrideProvider(getModelToken('Rent'))
      .useValue(mockRepository)
      .compile();

    rentService = module.get<RentService>(RentService);
    userService = module.get<UserService>(UserService);
    copyService = module.get<CopyService>(CopyService);
    storeService = module.get<StoreService>(StoreService);
    rentController = module.get<RentController>(RentController);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(rentController).toBeDefined();
  });
});
