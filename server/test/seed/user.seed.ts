import { Review, ReviewSchema } from './../../src/schemas/review.schema';
import { Test, TestingModule } from '@nestjs/testing';
import appConfig from '../../src/config/app.config';
import { Connection } from 'mongoose';
import { MongooseModule, getConnectionToken } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import DbModule, { closeMongoConnection } from '../db-test-module';
import { UserService } from '../../src/modules/user/user.service';
import { User, UserSchema } from '../../src/schemas/user.schema';
import { users } from './data/user.data';
import { Copy, CopySchema } from '../../src/schemas/copy.schema';

export const UserSeed = () => {
  describe('User', () => {
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
            { name: Review.name, schema: ReviewSchema },
            { name: Copy.name, schema: CopySchema },
          ]),
        ],
        providers: [UserService],
      }).compile();

      connection = await module.get(getConnectionToken());
      userService = module.get<UserService>(UserService);
    });

    test('seed', async () => {
      await Promise.all(
        users.map(async (item) => {
          await userService.create(item);
        }),
      );
      const result = await userService.findAll();
      expect(result).toHaveLength(users.length);
    });

    afterAll(async () => {
      await connection.close();
      await closeMongoConnection();
    });
  });
};
