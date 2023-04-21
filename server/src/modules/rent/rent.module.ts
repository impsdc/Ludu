import { Module } from '@nestjs/common';
import { RentService } from './rent.service';
import { RentController } from './rent.controller';
import { Rent, RentSchema } from '../../schemas/rent.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CopyModule } from '../copy/copy.module';
import { UserModule } from '../user/user.module';
import { User, UserSchema } from '../../schemas/user.schema';
import { Copy, CopySchema } from '../../schemas/copy.schema';
import { StoreModule } from '../store/store.module';
import { Store, StoreSchema } from '../../schemas/store.schema';
@Module({
  imports: [
    CopyModule,
    UserModule,
    StoreModule,
    MongooseModule.forFeature([
      {
        name: Rent.name,
        schema: RentSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Copy.name,
        schema: CopySchema,
      },
      {
        name: Store.name,
        schema: StoreSchema,
      },
    ]),
  ],
  controllers: [RentController],
  providers: [RentService],
  exports: [RentService],
})
export class RentModule {}
