import axios from 'axios';

import * as actions from '../actions/api';

const api =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    // dispatch({ type: 'UNKNOWN' });
    next(action);
  };

export default api;
