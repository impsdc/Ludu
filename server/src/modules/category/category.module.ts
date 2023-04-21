import { forwardRef, Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { GameModule } from '../game/game.module';
import { Game, GameSchema } from '../../schemas/game.schema';
import { Category, CategorySchema } from '../../schemas/category.schema';

@Module({
  imports: [
    forwardRef(() => GameModule),
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
      { name: Game.name, schema: GameSchema },
    ]),
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
