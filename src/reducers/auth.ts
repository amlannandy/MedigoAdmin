import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
} from '../constants/index';

const initialState = {
  user: null,
  authActions: {
    error: null,
    message: null,
    isLoading: false,
    isInitialized: false,
    isAuthenticated: false,
    isAuthenticating: false,
  },
};

const auth = (state: object = initialState, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        authActions: {
          isAuthenticating: true,
        },
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: payload,
        authActions: {
          isAuthenticating: false,
          isAuthenticated: true,
        },
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        authActions: {
          isAuthenticating: false,
          error: payload,
        },
      };
    case LOAD_USER_REQUEST:
      return {
        ...state,
        authActions: {
          isLoading: true,
        },
      };
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        user: payload,
        authActions: {
          isLoading: false,
          isInitialized: true,
          isAuthenticated: true,
        },
      };
    case LOAD_USER_FAILURE:
      return {
        ...state,
        authActions: {
          isLoading: false,
          isInitialized: true,
          isAuthenticated: false,
        },
      };
    default:
      return state;
  }
};

export default auth;
