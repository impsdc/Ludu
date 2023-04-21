import {
  SET_CATEGORY_FILTER,
  RESET_CATEGORY_FILTER,
  TOGGLE_CATEGORY_FILTER,
} from '../types/filterGamesByCategoriesTypes';
import { Categories } from '../../models/states/Category';
import { Action } from '../../models/Action';

const initialState: {
  active: boolean;
  filters: Array<keyof typeof Categories | ''>;
} = {
  active: false,
  filters: [],
};

const filterGamesByCategoriesReducer = (state = initialState, action: Action<any>) => {
  switch (action.type) {
    case SET_CATEGORY_FILTER:
      if (!state.filters.includes(action.payload))
        return {
          ...state,
          filters: [
            ...new Set(
              [...state.filters, ...action.payload].filter((e) => action.payload.includes(e)),
            ),
          ],
        };
    case RESET_CATEGORY_FILTER:
      return initialState;
    case TOGGLE_CATEGORY_FILTER:
      return { ...state, active: !state.active };
    default:
      return state;
  }
};
export default filterGamesByCategoriesReducer;
