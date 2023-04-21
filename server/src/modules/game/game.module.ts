import { forwardRef, Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from '../category/category.module';
import { Game, GameSchema } from '../../schemas/game.schema';
import { Category, CategorySchema } from '../../schemas/category.schema';

@Module({
  imports: [
    forwardRef(() => CategoryModule),
    MongooseModule.forFeature([
      { name: Game.name, schema: GameSchema },
      { name: Category.name, schema: CategorySchema },
    ]),
  ],
  controllers: [GameController],
  providers: [GameService],
  exports: [GameService],
})
export class GameModule {}
