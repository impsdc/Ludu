import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ReviewDto } from './dto/review.dto';
import { Model } from 'mongoose';
import { NotFoundException } from '@nestjs/common';
import { ReviewDocument } from '../../schemas/review.schema';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel('Review')
    private reviewModel: Model<ReviewDocument>,
  ) {}
  public async create(reviewDto: ReviewDto): Promise<ReviewDocument> {
    return await this.reviewModel.create(reviewDto);
  }

  public async findAll(): Promise<ReviewDocument[]> {
    return await this.reviewModel.find();
  }

  public async findOne(id: string): Promise<ReviewDocument> {
    return await this.reviewModel.findById(id).populate('user', 'avatar username');
  }

  public async findIfAlreadyExist(reviewDto: ReviewDto): Promise<ReviewDocument | any> {
    if (reviewDto.store) {
      return await this.reviewModel.find({
        user: reviewDto.user,
        store: reviewDto.store,
      });
    } else {
      return await this.reviewModel.find({
        user: reviewDto.user,
        game: reviewDto.game,
      });
    }
  }

  public async update(id: string, reviewDto: ReviewDto): Promise<ReviewDocument> {
    const existingStore = await this.reviewModel.findByIdAndUpdate({ _id: id }, reviewDto);

    if (!existingStore) throw new NotFoundException(`Review #${id} not found`);

    return await this.reviewModel.findById(id);
  }

  public async remove(id: string): Promise<ReviewDocument> {
    const isReview = await this.reviewModel.findByIdAndRemove(id);

    if (!isReview) throw new NotFoundException(`Review #${id} not found`);

    return isReview;
  }
}
