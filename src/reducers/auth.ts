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
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAILURE,
  DELETE_ACCOUNT_REQUEST,
  DELETE_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT_FAILURE,
  ADD_CLINIC_SUCCESS,
  DELETE_CLINIC_SUCCESS,
  REMOVE_AUTH_MESSAGE,
  REMOVE_AUTH_ERROR,
  VERIFY_PASSWORD_REQUEST,
  VERIFY_PASSWORD_SUCCESS,
  VERIFY_PASSWORD_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  RELOAD_USER_REQUEST,
  RELOAD_USER_SUCCESS,
  RELOAD_USER_FAILURE,
  UPDATE_EMAIL_REQUEST,
  UPDATE_EMAIL_SUCCESS,
  UPDATE_EMAIL_FAILURE,
  UPDATE_PHOTO_REQUEST,
  UPDATE_PHOTO_SUCCESS,
  UPDATE_PHOTO_FAILURE,
} from '../constants/index';

export interface AuthState {
  user: {
    id: string;
    name: string;
    age: number;
    email: string;
    phone: string;
    city: string;
    imageUrl: string;
    field: string;
    hospital: string;
    experience: number;
    clinicId: string;
    location: {
      latitude: number;
      longitude: number;
    };
    isVerified: boolean;
    createdAt: any;
  };
  authActions: {
    error: string;
    message: string;
    isLoading: boolean;
    isUpdating: boolean;
    isDeleting: boolean;
    isReloading: boolean;
    isInitialized: boolean;
    isAuthenticated: boolean;
    isAuthenticating: boolean;
    isUpdatingPassword: boolean;
    isVerifyingPassword: boolean;
  };
}

const initialState: AuthState = {
  user: null,
  authActions: {
    error: '',
    message: '',
    isLoading: false,
    isUpdating: false,
    isDeleting: false,
    isReloading: false,
    isInitialized: false,
    isAuthenticated: false,
    isAuthenticating: false,
    isUpdatingPassword: false,
    isVerifyingPassword: false,
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
    case UPDATE_PASSWORD_REQUEST:
      return {
        ...state,
        authActions: {
          ...state.authActions,
          isUpdatingPassword: true,
        },
      };
    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        authActions: {
          ...state.authActions,
          isUpdatingPassword: false,
          message: payload,
        },
      };
    case UPDATE_PASSWORD_FAILURE:
      return {
        ...state,
        authActions: {
          ...state.authActions,
          isUpdatingPassword: false,
          error: payload,
        },
      };
    case DELETE_ACCOUNT_REQUEST:
      return {
        ...state,
        authActions: {
          ...state.authActions,
          isDeleting: true,
        },
      };
    case DELETE_ACCOUNT_SUCCESS:
      return {
        ...state,
        user: null,
        authActions: {
          ...state.authActions,
          isDeleting: false,
          isAuthenticated: false,
        },
      };
    case DELETE_ACCOUNT_FAILURE:
      return {
        ...state,
        authActions: {
          ...state.authActions,
          isDeleting: false,
          error: payload,
        },
      };
    case ADD_CLINIC_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          clinicId: payload.id,
        },
      };
    case DELETE_CLINIC_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          clinicId: null,
        },
      };
    case REMOVE_AUTH_MESSAGE:
      return {
        ...state,
        authActions: {
          ...state.authActions,
          message: '',
        },
      };
    case REMOVE_AUTH_ERROR:
      return {
        ...state,
        authActions: {
          ...state.authActions,
          error: '',
        },
      };
    case VERIFY_PASSWORD_REQUEST:
      return {
        ...state,
        authActions: {
          ...state.authActions,
          isVerifyingPassword: true,
        },
      };
    case VERIFY_PASSWORD_SUCCESS:
      return {
        ...state,
        authActions: {
          ...state.authActions,
          isVerifyingPassword: false,
        },
      };
    case VERIFY_PASSWORD_FAILURE:
      return {
        ...state,
        authActions: {
          ...state.authActions,
          error: payload,
          isVerifyingPassword: false,
        },
      };
    case RELOAD_USER_REQUEST:
      return {
        ...state,
        authActions: {
          ...state.authActions,
          isReloading: true,
        },
      };
    case RELOAD_USER_SUCCESS:
      return {
        ...state,
        user: payload,
        authActions: {
          ...state.authActions,
          isReloading: false,
        },
      };
    case RELOAD_USER_FAILURE:
      return {
        ...state,
        authActions: {
          ...state.authActions,
          isReloading: false,
          error: payload,
        },
      };
    case UPDATE_USER_REQUEST:
    case UPDATE_EMAIL_REQUEST:
    case UPDATE_PHOTO_REQUEST:
      return {
        ...state,
        authActions: {
          ...state.authActions,
          isUpdating: true,
        },
      };
    case UPDATE_USER_SUCCESS:
    case UPDATE_EMAIL_SUCCESS:
    case UPDATE_PHOTO_SUCCESS:
      return {
        ...state,
        authActions: {
          ...state.authActions,
          isUpdating: false,
        },
      };
    case UPDATE_USER_FAILURE:
    case UPDATE_EMAIL_FAILURE:
    case UPDATE_PHOTO_FAILURE:
      return {
        ...state,
        authActions: {
          ...state.authActions,
          isUpdating: false,
          error: payload,
        },
      };
    default:
      return state;
  }
};

export default auth;
