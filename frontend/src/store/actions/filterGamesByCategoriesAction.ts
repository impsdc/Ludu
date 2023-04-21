import { CategoriesToDisplay } from '../../models/states/Category';
import {
  SET_CATEGORY_FILTER,
  RESET_CATEGORY_FILTER,
  TOGGLE_CATEGORY_FILTER,
} from '../types/filterGamesByCategoriesTypes';

export const setCategoryFilter = (filter: CategoriesToDisplay | string[]) => ({
  type: SET_CATEGORY_FILTER,
  payload: filter,
});
export const resetCategoryFilter = () => ({
  type: RESET_CATEGORY_FILTER,
});
export const toggleCategoryFilter = () => ({
  type: TOGGLE_CATEGORY_FILTER,
});
