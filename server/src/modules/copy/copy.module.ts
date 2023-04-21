import { Module } from '@nestjs/common';
import { CopyService } from './copy.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CopyController } from './copy.controller';
import { StoreModule } from '../store/store.module';
import { GameModule } from '../game/game.module';
import { Game, GameSchema } from '../../schemas/game.schema';
import { Store, StoreSchema } from '../../schemas/store.schema';
import { Copy, CopySchema } from '../../schemas/copy.schema';
import { User, UserSchema } from '../../schemas/user.schema';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    StoreModule,
    GameModule,
    UserModule,
    MongooseModule.forFeature([
      { name: Game.name, schema: GameSchema },
      { name: Store.name, schema: StoreSchema },
      { name: Copy.name, schema: CopySchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  exports: [CopyService],
  controllers: [CopyController],
  providers: [CopyService],
})
export class CopyModule {}
