import { GameModule } from './game.module';
import { Injectable, NotFoundException } from '@nestjs/common';
import { GameDto } from './dto/game.dto';
import { GameUpdateDto } from './dto/game.update.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GameDocument } from '../../schemas/game.schema';
import { Category } from '../../schemas/category.schema';
import { Review } from '../../schemas/review.schema';

@Injectable()
export class GameService {
  constructor(
    @InjectModel('Game')
    private gameModel: Model<GameDocument>,
  ) {}

  async create(gameDto: GameDto): Promise<GameDocument> {
    return this.gameModel.create(gameDto);
  }

  public async findAll(): Promise<GameDocument[]> {
    return await this.gameModel.find().populate('categories', 'name');
  }

  public async random(): Promise<GameDocument[]> {
    const random = Math.floor(Math.random() * 5);

    return this.gameModel.aggregate([{ $sample: { size: random } }]);
  }

  public async findById(id: string): Promise<GameDocument> {
    return await this.gameModel.findById(id).populate('categories', 'name');
  }

  public async findByCategory(categoryId: string): Promise<GameDocument[] | []> {
    const gamesByCategory = await this.gameModel.find({
      categories: categoryId,
    });

    if (gamesByCategory.length === 0) return null;

    return gamesByCategory;
  }

  public async gameAlreadyExist(ean: string): Promise<GameDocument> {
    return await this.gameModel.findOne({
      ean: ean,
    });
  }

  public async update(id: string, updateGameDto: GameUpdateDto): Promise<GameDocument> {
    const createdGame = await this.gameModel
      .findByIdAndUpdate({ _id: id }, updateGameDto)
      .populate('categories');

    if (!createdGame) throw new NotFoundException(`Game #${id} not found`);

    return createdGame;
  }

  public async updateCategories(
    id: string,
    category: (string | Category)[],
  ): Promise<GameDocument> {
    const updatedGame = await this.gameModel.updateOne(
      { _id: id },
      { $set: { categories: category } },
    );

    if (!updatedGame) throw new NotFoundException(`Game #${id} not found`);

    return await this.gameModel.findById(id);
  }

  public async updateReviews(id: string, reviewIds: (string | Review)[]): Promise<GameDocument> {
    const updatedGame = await this.gameModel
      .findOneAndUpdate({ _id: id }, { $set: { reviews: reviewIds } }, { returnOriginal: false })
      .populate('reviews', 'score');

    const average = (arr) => arr.reduce((p, c) => p + c, 0) / arr.length;
    const arrayOfReviewStart = updatedGame.reviews.map((a) => a.score);

    await this.gameModel.updateOne(
      { _id: id },
      {
        $set: {
          tags: {
            playTime: updatedGame.tags.playTime,
            players: updatedGame.tags.players,
            meanReviews: average(arrayOfReviewStart),
          },
        },
      },
    );
    const lol = await this.gameModel.findById(id);
    return await this.gameModel.findById(id);
  }

  public async remove(id: string): Promise<GameDocument> {
    const isGame = await this.gameModel.findByIdAndRemove(id);

    if (!isGame) throw new NotFoundException(`Game #${id} not found`);

    return isGame;
  }
}
