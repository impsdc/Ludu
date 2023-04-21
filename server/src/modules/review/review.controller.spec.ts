import { Test, TestingModule } from '@nestjs/testing';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';
import { GameService } from '../game/game.service';
import { UserService } from '../user/user.service';
import { StoreService } from '../store/store.service';

jest.mock('./review.service');
jest.mock('../game/game.service');
jest.mock('../user/user.service');
jest.mock('../store/store.service');

describe('ReviewController', () => {
  let controller: ReviewController;
  let reviewService: ReviewService;
  let gameService: GameService;
  let userService: UserService;
  let storeService: StoreService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReviewController],
      providers: [ReviewService, GameService, UserService, StoreService],
    }).compile();

    controller = module.get<ReviewController>(ReviewController);
    reviewService = module.get<ReviewService>(ReviewService);
    gameService = module.get<GameService>(GameService);
    userService = module.get<UserService>(UserService);
    storeService = module.get<StoreService>(StoreService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
