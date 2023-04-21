import { Test, TestingModule } from '@nestjs/testing';
import { GameController } from './game.controller';
import { GameService } from './game.service';
import { CategoryService } from '../category/category.service';
import { getModelToken } from '@nestjs/mongoose';

jest.mock('./game.service');
jest.mock('../category/category.service');

describe('GameController', () => {
  let controller: GameController;
  let gameService: GameService;

  const mockRepository = {
    find() {
      return {};
    },
  };
  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GameController],
      providers: [GameService, CategoryService],
    })
      .overrideProvider(getModelToken('Game'))
      .useValue(mockRepository)
      .compile();

    controller = module.get<GameController>(GameController);
    gameService = module.get<GameService>(GameService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
