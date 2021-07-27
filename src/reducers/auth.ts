import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
} from '../constants/index';

export interface AuthState {
  user: any;
  authActions: {
    error: string;
    message: string;
    isLoading: boolean;
    isInitialized: boolean;
    isAuthenticated: boolean;
    isAuthenticating: boolean;
  };
}

const initialState: AuthState = {
  user: null,
  authActions: {
    error: '',
    message: '',
    isLoading: false,
    isInitialized: false,
    isAuthenticated: false,
    isAuthenticating: false,
  },
};

const auth = (state: AuthState = initialState, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        authActions: {
          ...state.authActions,
          isAuthenticating: true,
        },
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: payload,
        authActions: {
          ...state.authActions,
          isAuthenticating: false,
          isAuthenticated: true,
        },
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        authActions: {
          ...state.authActions,
          isAuthenticating: false,
          error: payload,
        },
      };
    case LOGOUT_REQUEST:
    case LOAD_USER_REQUEST:
      return {
        ...state,
        authActions: {
          ...state.authActions,
          isLoading: true,
        },
      };
    case LOAD_USER_SUCCESS:
      return {
        ...state,
        user: payload,
        authActions: {
          ...state.authActions,
          isLoading: false,
          isInitialized: true,
          isAuthenticated: true,
        },
      };
    case LOAD_USER_FAILURE:
      return {
        ...state,
        authActions: {
          ...state.authActions,
          isLoading: false,
          isInitialized: true,
          isAuthenticated: false,
        },
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        authActions: {
          ...state.authActions,
          isLoading: false,
          isAuthenticated: false,
        },
      };
    case LOGOUT_FAILURE:
      return {
        ...state,
        authActions: {
          ...state.authActions,
          isLoading: false,
          error: payload,
        },
      };
    default:
      return state;
  }
};

export default auth;
