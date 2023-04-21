import { StoreService } from './../store.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Seeder, DataFactory } from 'nestjs-seeder-impsdc';
import { Store } from '../../../schemas/store.schema';
import { Location } from '../../../schemas/location.schema';

@Injectable()
export class StoreSeeder implements Seeder {
  constructor(
    @InjectModel(Store.name) private readonly store: Model<Store>,
    @InjectModel(Location.name) private readonly location: Model<Location>,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async seed(): Promise<any> {}

  async drop(): Promise<any> {
    return this.store.deleteMany({});
  }
}
