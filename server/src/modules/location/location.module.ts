import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Location, LocationSchema } from '../../schemas/location.schema';
import { Store, StoreSchema } from '../../schemas/store.schema';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Location.name, schema: LocationSchema },
      { name: Store.name, schema: StoreSchema },
    ]),
  ],
  controllers: [LocationController],
  providers: [LocationService],
})
export class LocationModule {}
