import { UserService } from './../../src/modules/user/user.service';
import { Test, TestingModule } from '@nestjs/testing';
import appConfig from '../../src/config/app.config';
import { Connection } from 'mongoose';
import { MongooseModule, getConnectionToken } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import DbModule, { closeMongoConnection } from '../db-test-module';
import { Location, LocationSchema } from '../../src/schemas/location.schema';
import { Store, StoreSchema } from '../../src/schemas/store.schema';
import { StoreService } from '../../src/modules/store/store.service';
import { Copy, CopySchema } from '../../src/schemas/copy.schema';
import { Game, GameSchema } from '../../src/schemas/game.schema';
import { User, UserSchema } from '../../src/schemas/user.schema';
import { GameService } from '../../src/modules/game/game.service';
import { Review, ReviewSchema } from '../../src/schemas/review.schema';
import { ReviewService } from '../../src/modules/review/review.service';
import { ReviewController } from '../../src/modules/review/review.controller';
import { gameReviews, storeReviews } from './data/review.data';
import { Category, CategorySchema } from '../../src/schemas/category.schema';

export const ReviewSeed = () => {
  describe('Review', () => {
    let storeService: StoreService;
    let reviewService: ReviewService;
    let gameService: GameService;
    let reviewController: ReviewController;
    let userService: UserService;
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
            { name: User.name, schema: UserSchema },
            { name: Store.name, schema: StoreSchema },
            { name: Game.name, schema: GameSchema },
            { name: Review.name, schema: ReviewSchema },
            { name: Location.name, schema: LocationSchema },
            { name: Category.name, schema: CategorySchema },
            { name: Copy.name, schema: CopySchema },
          ]),
        ],
        providers: [UserService, StoreService, GameService, GameService, ReviewService],
      }).compile();

      connection = await module.get(getConnectionToken());
      storeService = module.get<StoreService>(StoreService);
      userService = module.get<UserService>(UserService);
      gameService = module.get<GameService>(GameService);
      reviewService = module.get<ReviewService>(ReviewService);
      reviewController = new ReviewController(
        reviewService,
        gameService,
        userService,
        storeService,
      );
    });

    describe('seed', () => {
      it('', async () => {
        const users = await userService.findAll();
        const games = await gameService.findAll();
        const stores = await storeService.findAll();

        const gameReview = gameReviews.map((gameReview, index) => {
          const gameId = games.shift()._id.toString();
          const userId = users[Math.round(Math.floor(Math.random() * users.length))]._id.toString();

          return Object.assign({}, gameReview, {
            game: gameId,
            user: userId,
            _id: undefined,
            store: undefined,
          });
        });
        const storeReview = users.map((user, index) => {
          const storeId =
            stores[Math.round(Math.floor(Math.random() * stores.length))]._id.toString();

          const userId = user._id.toString();

          return Object.assign({}, user, {
            store: storeId,
            user: userId,
            game: undefined,
            _id: undefined,
            ...storeReviews[index],
          });
        });
        const reviews = [...gameReview, ...storeReview];
        await Promise.all(
          reviews.map(async (item) => {
            await reviewController.create(item);
          }),
        );

        const result = await reviewService.findAll();
        return expect(result).toHaveLength(reviews.length);
      });
    });
    afterAll(async () => {
      await connection.close();
      await closeMongoConnection();
    });
  });
};
