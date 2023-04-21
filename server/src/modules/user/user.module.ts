import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../schemas/user.schema';
import { Store, StoreSchema } from '../../schemas/store.schema';

@Module({
  providers: [UserService],
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Store.name,
        schema: StoreSchema,
      },
    ]),
  ],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
