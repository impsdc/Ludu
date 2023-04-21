import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Seeder } from 'nestjs-seeder-impsdc';
import { User } from '../../../schemas/user.schema';

@Injectable()
export class UserSeeder implements Seeder {
  constructor(@InjectModel(User.name) private readonly user: Model<User>) {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async seed(): Promise<any> {}

  async drop(): Promise<any> {
    return this.user.deleteMany({});
  }
}
