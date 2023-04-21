import { Game } from './Game';

export interface Copy {
  _id: string;
  game: Game;
  available: boolean;
}
