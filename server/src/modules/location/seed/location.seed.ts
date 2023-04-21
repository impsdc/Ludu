import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Seeder, DataFactory } from 'nestjs-seeder-impsdc';
import { Location } from '../../../schemas/location.schema';

@Injectable()
export class LocationSeeder implements Seeder {
  constructor(@InjectModel(Location.name) private readonly location: Model<Location>) {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async seed(): Promise<any> {}

  async drop(): Promise<any> {
    return this.location.deleteMany({});
  }
}
