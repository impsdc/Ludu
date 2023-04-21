export declare class Category {
  _id: string;
  name: string;
}

export enum Categories {
  cardGames = 'Jeux de cartes',
  roleplayGames = 'Jeux de roles',
  strategyGames = 'Jeux de stratégie',
  escapeGames = "Jeux d'évasion",
  partyGames = 'Jeux à boire',
}

export type CategoriesToDisplay = (
  | 'Jeux de cartes'
  | 'Jeux de roles'
  | 'Jeux de stratégie'
  | "Jeux d'évasion"
  | 'Jeux à boire'
)[];
