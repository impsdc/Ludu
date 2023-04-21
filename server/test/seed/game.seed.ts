import { GameSchema } from './../../src/schemas/game.schema';
import { Category, CategorySchema } from './../../src/schemas/category.schema';
import { GameService } from './../../src/modules/game/game.service';
import { games } from './data/game.data';
import { Test, TestingModule } from '@nestjs/testing';
import appConfig from '../../src/config/app.config';
import { Connection } from 'mongoose';
import { MongooseModule, getConnectionToken } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import DbModule, { closeMongoConnection } from '../db-test-module';
import { CategoryService } from '../../src/modules/category/category.service';
import { Game } from '../../src/schemas/game.schema';

export const GameSeed = () => {
  describe('Game', () => {
    let categoryService: CategoryService;
    let gameService: GameService;
    let connection: Connection;

    beforeAll(async () => {
      jest.setTimeout(60000);
      const module: TestingModule = await Test.createTestingModule({
        imports: [
          ConfigModule.forRoot({
            load: [appConfig],
          }),
          DbModule({
            uri: appConfig().database.prod,
          }),
          MongooseModule.forFeature([
            { name: Category.name, schema: CategorySchema },
            { name: Game.name, schema: GameSchema },
          ]),
        ],
        providers: [CategoryService, GameService],
      }).compile();

      connection = await module.get(getConnectionToken());
      gameService = module.get<GameService>(GameService);
      categoryService = module.get<CategoryService>(CategoryService);
    });

    describe('seed', () => {
      test('', async () => {
        const categories = await categoryService.findAll();
        const gameWithCategory = games.map((element) => {
          const categoryId =
            categories[Math.round(Math.floor(Math.random() * categories.length))]._id.toString();

          return Object.assign({}, element, {
            categories: [categoryId],
            _id: undefined,
          });
        });
        await Promise.all(
          gameWithCategory.map(async (item) => {
            await gameService.create(item);
          }),
        );
        const result = await gameService.findAll();
        return expect(result).toHaveLength(games.length);
      });
    });
    afterAll(async () => {
      await connection.close();
      await closeMongoConnection();
    });
  });
};
