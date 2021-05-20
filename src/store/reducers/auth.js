import {
  LOGIN,
  LOGOUT,
  AUTHENTICATE,
  SET_AUTH_ERROR,
  TOGGLE_AUTH_LOADING,
} from '../actions/auth';

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
  error: null,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN:
    case AUTHENTICATE:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: payload,
      };
    case SET_AUTH_ERROR:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case TOGGLE_AUTH_LOADING:
      return {
        ...state,
        isLoading: payload,
        error: null,
      };
    case LOGOUT:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default reducer;
