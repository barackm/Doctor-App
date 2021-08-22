import axios from 'axios';

import * as actions from '../actions/api';

const api =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    // next(action);
    console.log('dispatched an action...');
    dispatch({ type: 'UNKNOWN' });
  };

export default api;
