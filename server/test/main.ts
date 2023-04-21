import { CategorySeed } from './seed/category.seed';
import { LocationSeed } from './seed/location.seed';
import { StoreSeeder } from './seed/store.seed';
import { GameSeed } from './seed/game.seed';
import { CopySeed } from './seed/copy.seed';
import { UserSeed } from './seed/user.seed';
import { ReviewSeed } from './seed/review.seed';
import { RentSeed } from './seed/rent.seed';

describe('Test', () => {
  // CategorySeed();
  LocationSeed();
  StoreSeeder();
  UserSeed();
  GameSeed();
  CopySeed();
  ReviewSeed();
  RentSeed();
});
