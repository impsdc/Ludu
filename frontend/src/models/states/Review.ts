import { User } from './User';
import { Game } from './Game';
import { Store } from './Store';

export interface Review {
  _id: string;
  score: number;
  review: string;
  date: Date;
  user: User;
  game: Game;
  store: Store;
}

export interface CreateReviewPayload {
  score: number;
  review: string;
  user: string;
  game: string;
}
