import { Test, TestingModule } from '@nestjs/testing';
import appConfig from '../../src/config/app.config';
import { Connection } from 'mongoose';
import { MongooseModule, getConnectionToken } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import DbModule, { closeMongoConnection } from '../db-test-module';
import { LocationService } from '../../src/modules/location/location.service';
import { Location, LocationSchema } from '../../src/schemas/location.schema';
import { locations } from './data/location.data';
import { Store, StoreSchema } from '../../src/schemas/store.schema';

export const LocationSeed = () => {
  describe('Location', () => {
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
          ]),
        ],
        providers: [LocationService],
      }).compile();

      connection = await module.get(getConnectionToken());
      locationService = module.get<LocationService>(LocationService);
    });

    describe('seed', () => {
      test('', async () => {
        await Promise.all(
          locations.map(async (item) => {
            await locationService.create(item);
          }),
        );
        const result = await locationService.findAll();
        expect(result).toHaveLength(locations.length);
      });
    });

    afterAll(async () => {
      await connection.close();
      await closeMongoConnection();
    });
  });
};
