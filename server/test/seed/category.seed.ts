import { Test, TestingModule } from '@nestjs/testing';
import appConfig from '../../src/config/app.config';
import { Connection } from 'mongoose';
import { MongooseModule, getConnectionToken } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import DbModule, { closeMongoConnection } from '../db-test-module';
import { CategoryService } from '../../src/modules/category/category.service';
import { Category, CategorySchema } from '../../src/schemas/category.schema';
import { categories } from './data/category.data';

export const CategorySeed = () => {
  describe('Category', () => {
    let categoryService: CategoryService;
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
          MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }]),
        ],
        providers: [CategoryService],
      }).compile();

      connection = await module.get(getConnectionToken());
      categoryService = module.get<CategoryService>(CategoryService);
    });

    describe('seed', () => {
      test('', async () => {
        await Promise.all(
          categories.map(async (item) => {
            await categoryService.create(item);
          }),
        );
        const locations = await categoryService.findAll();
        expect(locations).toHaveLength(categories.length);
      });
    });

    afterAll(async () => {
      await connection.close();
      await closeMongoConnection();
    });
  });
};
