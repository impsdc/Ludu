import { seeder } from 'nestjs-seeder-impsdc';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from '../schemas/category.schema';
import { Location, LocationSchema } from '../schemas/location.schema';
import { LocationSeeder } from '../modules/location/seed/location.seed';
import { CategorySeeder } from '../modules/category/seed/category.seed';
import { GameSeeder } from '../modules/game/seed/game.seed';
import { Game, GameSchema } from '../schemas/game.schema';
import appConfig from '../config/app.config';
import { ConfigModule } from '@nestjs/config';
import { Store, StoreSchema } from '../schemas/store.schema';
import { StoreSeeder } from '../modules/store/seed/store.seed';
import { User, UserSchema } from '../schemas/user.schema';
import { UserSeeder } from '../modules/user/seed/user.seed';
import { Copy, CopySchema } from '../schemas/copy.schema';
import { CopySeeder } from '../modules/copy/seed/copy.seed';
import { RentSeeder } from '../modules/rent/seed/rent.seed';
import { Rent, RentSchema } from '../schemas/rent.schema';
import { ReviewSeeder } from '../modules/review/seed/review.seed';
import { Review, ReviewSchema } from '../schemas/review.schema';

seeder({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig],
    }),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: appConfig().database.prod,
      }),
    }),
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema },
      { name: Game.name, schema: GameSchema },
      { name: Location.name, schema: LocationSchema },
      { name: Store.name, schema: StoreSchema },
      { name: User.name, schema: UserSchema },
      { name: Copy.name, schema: CopySchema },
      { name: Rent.name, schema: RentSchema },
      { name: Review.name, schema: ReviewSchema },
    ]),
  ],
}).run([
  // CategorySeeder,
  LocationSeeder,
  GameSeeder,
  UserSeeder,
  StoreSeeder,
  CopySeeder,
  RentSeeder,
  ReviewSeeder,
]);
