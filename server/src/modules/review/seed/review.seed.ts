import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Seeder, DataFactory } from 'nestjs-seeder-impsdc';
import { Review } from '../../../schemas/review.schema';
import { Game } from '../../../schemas/game.schema';
import { Store } from '../../../schemas/store.schema';
import { User } from '../../../schemas/user.schema';

@Injectable()
export class ReviewSeeder implements Seeder {
  constructor(
    @InjectModel(Review.name) private readonly review: Model<Review>,
    @InjectModel(Game.name) private readonly game: Model<Game>,
    @InjectModel(Store.name) private readonly store: Model<Store>,
    @InjectModel(User.name) private readonly user: Model<User>,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async seed(): Promise<any> {}

  async drop(): Promise<any> {
    return this.review.deleteMany({});
  }
}
