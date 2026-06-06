import {configureStore} from '@reduxjs/toolkit'
import { eventReducer } from './eventReducer';
import {errorReducer} from './errorReducer'

export const store = configureStore({
  reducer: {
    events: eventReducer,
    errors: errorReducer,
  },
  preloadedState: {}
});

export default store;