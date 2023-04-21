import { CategoriesToDisplay } from './states/Category';
import { RentStatusToDisplay } from './states/Rent';

export type FilterOptions = CategoriesToDisplay | RentStatusToDisplay;
export enum FilterTypes {
  Category = 'category',
  Status = 'status',
}
