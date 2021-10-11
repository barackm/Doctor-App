import { configureStore } from '@reduxjs/toolkit';
import api from './middlewares/api';
import error from './middlewares/error';
import rootReducer from './reducers/reducers';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api, error),
});

window.store = store;
export default store;
