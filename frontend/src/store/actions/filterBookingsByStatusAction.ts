import { RentStatusToDisplay } from '../../models/states/Rent';
import {
  SET_STATUS_FILTER,
  RESET_STATUS_FILTER,
  TOGGLE_STATUS_FILTER,
} from '../types/filterBookingsByStatusTypes';

export const setStatusFilter = (filter: RentStatusToDisplay | string[]) => ({
  type: SET_STATUS_FILTER,
  payload: filter,
});
export const resetStatusFilter = () => ({
  type: RESET_STATUS_FILTER,
});
export const toggleStatusFilter = () => ({
  type: TOGGLE_STATUS_FILTER,
});
