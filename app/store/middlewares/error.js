import * as actions from '../actions/api';
import Toast from 'react-native-toast-message';

const error = () => (next) => (action) => {
  if (action.type !== actions.apiCallFailed) return next(action);

  Toast.show({
    type: 'error',
    text1: 'Error',
    text2: action.payload,
  });
};

export default error;
