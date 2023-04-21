import { storesLille, storesLyon } from './data/store.data';
import { Test, TestingModule } from '@nestjs/testing';
import appConfig from '../../src/config/app.config';
import { Connection } from 'mongoose';
import { MongooseModule, getConnectionToken } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import DbModule, { closeMongoConnection } from '../db-test-module';
import { LocationService } from '../../src/modules/location/location.service';
import { Location, LocationSchema } from '../../src/schemas/location.schema';
import { Store, StoreSchema } from '../../src/schemas/store.schema';
import { StoreService } from '../../src/modules/store/store.service';
import { Copy, CopySchema } from '../../src/schemas/copy.schema';
import { Review, ReviewSchema } from '../../src/schemas/review.schema';

export const StoreSeeder = () => {
  describe('Store', () => {
    let storeService: StoreService;
    let locationService: LocationService;
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
            { name: Location.name, schema: LocationSchema },
            { name: Store.name, schema: StoreSchema },
            { name: Copy.name, schema: CopySchema },
            { name: Review.name, schema: ReviewSchema },
          ]),
        ],
        providers: [LocationService, StoreService],
      }).compile();

      connection = await module.get(getConnectionToken());
      storeService = module.get<StoreService>(StoreService);
      locationService = module.get<LocationService>(LocationService);
    });

    describe('seed', () => {
      it('', async () => {
        const locationLille = await locationService.findByZip('59000');
        const locationLyon = await locationService.findByZip('69000');
        const lille = storesLille.map((store) => {
          const locationId =
            locationLille[
              Math.round(Math.floor(Math.random() * locationLille.length))
            ]._id.toString();

          return Object.assign({}, store, { location: locationId });
        });
        const lyon = storesLyon.map((store) => {
          const locationId =
            locationLyon[
              Math.round(Math.floor(Math.random() * locationLyon.length))
            ]._id.toString();

          return Object.assign({}, store, { location: locationId });
        });
        const stores = [...lyon, ...lille];
        await Promise.all(
          stores.map(async (item) => {
            await storeService.create(item);
          }),
        );

        const result = await storeService.findAll();
        return expect(result).toHaveLength(stores.length);
      });
    });
    afterAll(async () => {
      await connection.close();
      await closeMongoConnection();
    });
  });
};
