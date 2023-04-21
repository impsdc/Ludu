import { SET_CURRENT_LOCATION } from '../types/currentLocationTypes';
import { Location } from '../../models/states/Location';

export const setCurrentLocation = (location: Location) => ({
  type: SET_CURRENT_LOCATION,
  payload: location,
});
