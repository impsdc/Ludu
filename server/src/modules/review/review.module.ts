import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { UserModule } from '../user/user.module';
import { StoreModule } from '../store/store.module';
import { GameModule } from '../game/game.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Store, StoreSchema } from '../../schemas/store.schema';
import { Review } from '../../schemas/review.schema';
import { User } from '../../schemas/user.schema';
import { Game } from '../../schemas/game.schema';
import { UserSchema } from '../../schemas/user.schema';
import { GameSchema } from '../../schemas/game.schema';
import { ReviewSchema } from '../../schemas/review.schema';

@Module({
  imports: [
    StoreModule,
    GameModule,
    UserModule,
    MongooseModule.forFeature([
      {
        name: Review.name,
        schema: ReviewSchema,
      },
      {
        name: Store.name,
        schema: StoreSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Game.name,
        schema: GameSchema,
      },
    ]),
  ],
  controllers: [ReviewController],
  providers: [ReviewService],
  exports: [ReviewService],
})
export class ReviewModule {}
