import { combineReducers } from 'redux';

import auth from './auth';
import patients from './patients';
import appointments from './appointments';

const rootReducer = combineReducers({
  auth,
  patients,
  appointments,
});

export default rootReducer;
