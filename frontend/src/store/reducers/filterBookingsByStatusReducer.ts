import {
  RESET_STATUS_FILTER,
  SET_STATUS_FILTER,
  TOGGLE_STATUS_FILTER,
} from '../types/filterBookingsByStatusTypes';
import { RentStatus } from '../../models/states/Rent';
import { Action } from '../../models/Action';

const initialState: {
  active: false;
  filters: Array<keyof typeof RentStatus | ''>;
} = { active: false, filters: [] };
const filterGamesByCategoriesReducer = (state = initialState, action: Action<any>) => {
  switch (action.type) {
    case SET_STATUS_FILTER:
      return {
        ...state,
        filters: [...action.payload].filter((e) => action.payload.includes(e)),
      };
    case RESET_STATUS_FILTER:
      return initialState;
    case TOGGLE_STATUS_FILTER:
      return { ...state, active: !state.active };
    default:
      return state;
  }
};
export default filterGamesByCategoriesReducer;
