import { Game, GameSchema } from '../../src/schemas/game.schema';
import { Copy, CopySchema } from '../../src/schemas/copy.schema';
import { GameService } from '../../src/modules/game/game.service';
import { Test, TestingModule } from '@nestjs/testing';
import appConfig from '../../src/config/app.config';
import { Connection } from 'mongoose';
import { MongooseModule, getConnectionToken } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import DbModule, { closeMongoConnection } from '../db-test-module';
import { Location, LocationSchema } from '../../src/schemas/location.schema';
import { Store, StoreSchema } from '../../src/schemas/store.schema';
import { CopyService } from '../../src/modules/copy/copy.service';
import { StoreService } from '../../src/modules/store/store.service';
import { CopyController } from '../../src/modules/copy/copy.controller';
import { Category, CategorySchema } from '../../src/schemas/category.schema';
import { UserService } from '../../src/modules/user/user.service';
import { User, UserSchema } from '../../src/schemas/user.schema';

export const CopySeed = () => {
  describe('Copy', () => {
    let copyController: CopyController;
    let gameService: GameService;
    let copyService: CopyService;
    let userService: UserService;
    let storeService: StoreService;
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
            { name: Store.name, schema: StoreSchema },
            { name: Copy.name, schema: CopySchema },
            { name: Game.name, schema: GameSchema },
            { name: Category.name, schema: CategorySchema },
            { name: User.name, schema: UserSchema },
            { name: Location.name, schema: LocationSchema },
          ]),
        ],
        controllers: [CopyController],
        providers: [GameService, CopyService, StoreService, UserService],
      }).compile();

      connection = await module.get(getConnectionToken());
      gameService = module.get<GameService>(GameService);
      copyService = module.get<CopyService>(CopyService);
      storeService = module.get<StoreService>(StoreService);
      userService = module.get<UserService>(UserService);
      copyController = new CopyController(copyService, storeService, userService, gameService);
    });

    test('seed', async () => {
      const stores = await storeService.findAll();
      const users = await userService.findAll();
      const games = await gameService.findAll();
      const copies = [];
      for (let i = 0; i < 80; i++) {
        const storesId =
          stores[Math.round(Math.floor(Math.random() * stores.length))]._id.toString();

        const gamesId = games[Math.round(Math.floor(Math.random() * games.length))]._id.toString();

        copies.push({
          game: gamesId,
          store: storesId,
          _id: undefined,
          available: true,
        });
      }

      for (let y = 0; y < 30; y++) {
        const userId = users[Math.round(Math.floor(Math.random() * users.length))]._id.toString();

        const gamesId = games[Math.round(Math.floor(Math.random() * games.length))]._id.toString();

        copies.push({
          game: gamesId,
          user: userId,
          _id: undefined,
          available: true,
        });
      }
      for (const item of copies) {
        await copyController.create(item);
      }
      const result = await copyService.findAll();
      expect(result).toHaveLength(80 + 30);
    });

    afterAll(async () => {
      await connection.close();
      await closeMongoConnection();
    });
  });
};
