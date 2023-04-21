import { Categories } from './Category';
import { Location } from './Location';
import { UserState } from './User';

export type MainAppState = {
  currentLocation: Location;
  user: UserState;
  filterBookingsByStatus: {
    active: false;
    filters;
  };
  filterGamesByCategories: {
    active: false;
    filters: [];
  };
};
