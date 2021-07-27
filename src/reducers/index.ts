import { combineReducers } from 'redux';

import auth from './auth';
import appointments from './appointments';

const rootReducer = combineReducers({
  auth,
  appointments,
});

export default rootReducer;
