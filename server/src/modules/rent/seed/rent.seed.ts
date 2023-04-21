import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Seeder, DataFactory } from 'nestjs-seeder-impsdc';
import { Copy } from '../../../schemas/copy.schema';
import { User } from '../../../schemas/user.schema';
import { Rent } from '../../../schemas/rent.schema';

@Injectable()
export class RentSeeder implements Seeder {
  constructor(
    @InjectModel(Copy.name) private readonly copy: Model<Copy>,
    @InjectModel(User.name) private readonly user: Model<User>,
    @InjectModel(Rent.name) private readonly rent: Model<Rent>,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async seed(): Promise<any> {}

  async drop(): Promise<any> {
    return this.rent.deleteMany({});
  }
}
