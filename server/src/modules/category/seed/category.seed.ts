import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Seeder, DataFactory } from 'nestjs-seeder-impsdc';
import { Category } from '../../../schemas/category.schema';

@Injectable()
export class CategorySeeder implements Seeder {
  constructor(@InjectModel(Category.name) private readonly category: Model<Category>) {}

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async seed(): Promise<any> {}

  async drop(): Promise<any> {
    return this.category.deleteMany({});
  }
}
