import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Seeder, DataFactory } from 'nestjs-seeder-impsdc';
import { Copy } from '../../../schemas/copy.schema';
import { Game } from '../../../schemas/game.schema';
import { Store } from '../../../schemas/store.schema';

@Injectable()
export class CopySeeder implements Seeder {
  constructor(
    @InjectModel(Copy.name) private readonly copy: Model<Copy>,
    @InjectModel(Game.name) private readonly game: Model<Game>,
    @InjectModel(Store.name) private readonly store: Model<Store>,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async seed(): Promise<any> {}

  async drop(): Promise<any> {
    return this.copy.deleteMany({});
  }
}
