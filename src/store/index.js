import { configureStore } from '@reduxjs/toolkit'
import CategoriesSlice from './CategoriesSlice';
import UserSlice from './UserSlice';
import ViolationSlice from './ViolationSlice';
import ServiceTypeSlice from './ServiceTypeSlice';

const store = configureStore({
  reducer: {
    category: CategoriesSlice,
    user: UserSlice,
    violation: ViolationSlice,
    serviceTypes: ServiceTypeSlice
  }
})

export default store;