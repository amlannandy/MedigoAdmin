import thunk from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

// Combine each reducer here
const rootReducer = combineReducers({});

const initialState = {};

// middleware for handling async functions
const middleWare = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  // dev tools for viewing redux state and changes in chrome
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
