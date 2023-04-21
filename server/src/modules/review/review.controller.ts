import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  NotFoundException,
  Put,
  Logger,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewDto } from './dto/review.dto';
import { ApiTags } from '@nestjs/swagger';
import { GameService } from '../game/game.service';
import { UserService } from '../user/user.service';
import { StoreService } from '../store/store.service';
import { JWTAuth } from '../../middlewares/decorators/JWTAuth';

@Controller('review')
@ApiTags('Review')
// @JWTAuth()
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService,
    private readonly gameService: GameService,
    private readonly userService: UserService,
    private readonly storeService: StoreService,
  ) {}

  @Post()
  async create(@Body() reviewDto: ReviewDto) {
    const existingUser = await this.userService.findById(reviewDto.user);
    if (!existingUser) throw new NotFoundException(`User #${reviewDto.user} not found`);
    const isStoreReview = reviewDto.store ? true : false;

    if (isStoreReview) {
      //  Store review
      const existingStore = await this.storeService.findById(reviewDto.store);
      if (!existingStore) throw new NotFoundException(`Store #${reviewDto.store} not found`);

      const reviewAlreadyExist = await this.reviewService.findIfAlreadyExist(reviewDto);
      if (reviewAlreadyExist.length !== 0)
        throw new NotFoundException(
          `A review already exist with this store from this user #${reviewDto.user}`,
        );

      // Create Review to retrieve its Id
      const newReview = await this.reviewService.create(reviewDto);
      // UpdateReview in relational documents
      try {
        await this.storeService.updateReviews(reviewDto.store, [
          ...existingStore.reviews,
          newReview._id.toString(),
        ]);
        await this.userService.updateReviews(reviewDto.user, [
          ...existingUser.reviews,
          newReview._id.toString(),
        ]);
      } catch (e) {
        Logger.log(e);
      }
      return newReview;
    } else {
      const existingGame = await this.gameService.findById(reviewDto.game);
      if (!existingGame) throw new NotFoundException(`Game #${reviewDto.game} not found`);

      const reviewAlreadyExist = await this.reviewService.findIfAlreadyExist(reviewDto);
      if (reviewAlreadyExist.length !== 0)
        throw new NotFoundException(
          `A review already exist with this game from this user #${reviewDto.user}`,
        );

      // Create Review to retrieve its Id
      const newReview = await this.reviewService.create(reviewDto);

      // UpdateReview in relational documents
      try {
        await this.gameService.updateReviews(reviewDto.game, [
          ...existingGame.reviews,
          newReview._id.toString(),
        ]);
        await this.userService.updateReviews(reviewDto.user, [
          ...existingUser.reviews,
          newReview._id.toString(),
        ]);
      } catch (e) {
        Logger.log(e);
      }
      return newReview;
    }
  }

  @Get()
  async findAll() {
    return await this.reviewService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const review = await this.reviewService.findOne(id);
    if (!review) throw new NotFoundException(`Review #${id} not found`);
    return review;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() reviewDto: ReviewDto) {
    return await this.reviewService.update(id, reviewDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const existingReview = await this.reviewService.findOne(id);

    if (!existingReview) throw new NotFoundException(`Review ${id} not found`);

    if (existingReview.store) {
      const store = await this.storeService.findById(existingReview.store);

      const user = await this.userService.findById(existingReview.user.toString());

      try {
        await this.storeService.updateReviews(
          existingReview.store.toString(),
          store.reviews.filter((item) => {
            return item.toString() !== id;
          }),
        );

        await this.userService.updateReviews(
          existingReview.user.toString(),
          user.reviews.filter((item) => {
            return item.toString() !== id;
          }),
        );
      } catch (e) {
        Logger.log(e);
      }

      return this.reviewService.remove(id);
    } else {
      const game = await this.gameService.findById(existingReview.game.toString());
      const user = await this.userService.findById(existingReview.user.toString());

      try {
        await this.gameService.updateReviews(
          existingReview.game.toString(),
          game.reviews.filter((item) => {
            return item.toString() !== id;
          }),
        );
        await this.userService.updateReviews(
          existingReview.user.toString(),
          user.reviews.filter((item) => {
            return item.toString() !== id;
          }),
        );
      } catch (e) {
        Logger.log(e);
      }
      return this.reviewService.remove(id);
    }
  }
}
