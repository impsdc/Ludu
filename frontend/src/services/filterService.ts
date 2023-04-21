import { useSelector } from 'react-redux';
import { FilterTypes } from '../models/Filter';
import { MainAppState } from '../models/states';
import { RentStatus } from '../models/states/Rent';
import { setStatusFilter, toggleStatusFilter } from '../store/actions/filterBookingsByStatusAction';
import {
  setCategoryFilter,
  toggleCategoryFilter,
} from '../store/actions/filterGamesByCategoriesAction';
import { FilterTitles } from '../utils/wording';
import { extendedApi as catApi } from '../services/LUDU_API/categories';

export const useFilter = (filterType: FilterTypes) => {
  function getToggleFn(filterType) {
    let toggleFn;
    switch (filterType) {
      case FilterTypes.Category:
        toggleFn = toggleCategoryFilter;
        break;
      case FilterTypes.Status:
        toggleFn = toggleStatusFilter;
        break;
    }
    return toggleFn;
  }

  function getSetFilterFn(filterType) {
    let setFilterFn;
    switch (filterType) {
      case FilterTypes.Category:
        setFilterFn = setCategoryFilter;
        break;
      case FilterTypes.Status:
        setFilterFn = setStatusFilter;
        break;
    }
    return setFilterFn;
  }

  function getFilteredElements(filterType) {
    const filteredElements = useSelector((state: MainAppState) => {
      switch (filterType) {
        case FilterTypes.Status:
          return state.filterBookingsByStatus.filters;
        case FilterTypes.Category:
          return state.filterGamesByCategories.filters;
        default:
          return null;
      }
    });
    return filteredElements;
  }

  function getTitle(filterType) {
    let title;
    switch (filterType) {
      case FilterTypes.Category:
        title = FilterTitles.CATEGORY;
        break;
      case FilterTypes.Status:
        title = FilterTitles.RENT_STATUS;
        break;
    }
    return title;
  }

  function getAssets(filterType) {
    const toggleFilter = getToggleFn(filterType);
    const setFilter = getSetFilterFn(filterType);
    const filteredElements = getFilteredElements(filterType);
    const filters = getCategoryFilters(filterType);
    const title = getTitle(filterType);
    return { toggleFilter, setFilter, filteredElements, filters, title };
  }
  const result = getAssets(filterType);
  return result;
};

export function getCategoryFilters(filterType) {
  let categories = [];

  switch (filterType) {
    case FilterTypes.Category:
      const data = catApi.endpoints.getAllCategories.useQuery();
      if (data) {
        data.currentData?.forEach((cat) => {
          const { name } = cat;
          categories.push(name);
        });
      }
      break;
    case FilterTypes.Status:
      categories = Object.values(RentStatus);
      break;
  }
  return categories;
}
