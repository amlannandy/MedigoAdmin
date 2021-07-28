import { combineReducers } from 'redux';

import auth from './auth';
import clinic from './clinic';
import patients from './patients';
import appointments from './appointments';

const rootReducer = combineReducers({
  auth,
  clinic,
  patients,
  appointments,
});

export default rootReducer;
