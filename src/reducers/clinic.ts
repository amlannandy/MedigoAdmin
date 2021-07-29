import {
  FETCH_CLINIC_REQUEST,
  FETCH_CLINIC_SUCCESS,
  FETCH_CLINIC_FAILURE,
  ADD_CLINIC_SUCCESS,
  ADD_CLINIC_REQUEST,
  ADD_CLINIC_FAILURE,
  DELETE_CLINIC_REQUEST,
  DELETE_CLINIC_SUCCESS,
  DELETE_CLINIC_FAILURE,
  UPDATE_CLINIC_PHOTO_REQUEST,
  UPDATE_CLINIC_PHOTO_SUCCESS,
  UPDATE_CLINIC_PHOTO_FAILURE,
} from '../constants/index';

export interface ClinicState {
  clinic: {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    imageUrl: string;
    doctorId: string;
    location: {
      latitude: number;
      longitude: number;
    };
  };
  clinicActions: {
    isAdding: boolean;
    isFetching: boolean;
    isDeleting: boolean;
    isUpdating: boolean;
    error: string;
    message: string;
  };
}

const initialState: ClinicState = {
  clinic: null,
  clinicActions: {
    isAdding: false,
    isFetching: false,
    isDeleting: false,
    isUpdating: false,
    error: '',
    message: '',
  },
};

const clinic = (state: ClinicState = initialState, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_CLINIC_REQUEST:
      return {
        ...state,
        clinicActions: {
          ...state.clinicActions,
          isFetching: true,
        },
      };
    case FETCH_CLINIC_SUCCESS:
      return {
        ...state,
        clinic: payload,
        clinicActions: {
          ...state.clinicActions,
          isFetching: false,
        },
      };
    case FETCH_CLINIC_FAILURE:
      return {
        ...state,
        clinicActions: {
          ...state.clinicActions,
          isFetching: false,
          error: false,
        },
      };
    case ADD_CLINIC_REQUEST:
      return {
        ...state,
        clinicActions: {
          ...state.clinicActions,
          isAdding: true,
        },
      };
    case ADD_CLINIC_SUCCESS:
      return {
        ...state,
        clinic: payload,
        clinicActions: {
          ...state.clinicActions,
          isAdding: false,
        },
      };
    case ADD_CLINIC_FAILURE:
      return {
        ...state,
        clinicActions: {
          ...state.clinicActions,
          isAdding: false,
          error: payload,
        },
      };
    case DELETE_CLINIC_REQUEST:
      return {
        ...state,
        clinicActions: {
          ...state.clinicActions,
          isDeleting: true,
        },
      };
    case DELETE_CLINIC_SUCCESS:
      return {
        ...state,
        clinic: null,
        clinicActions: {
          ...state.clinicActions,
          isDeleting: false,
        },
      };
    case DELETE_CLINIC_FAILURE:
      return {
        ...state,
        clinicActions: {
          ...state.clinicActions,
          isDeleting: false,
          error: payload,
        },
      };
    case UPDATE_CLINIC_PHOTO_REQUEST:
      return {
        ...state,
        clinicActions: {
          ...state.clinicActions,
          isUpdating: true,
        },
      };
    case UPDATE_CLINIC_PHOTO_SUCCESS:
      return {
        ...state,
        clinicActions: {
          ...state.clinicActions,
          isUpdating: false,
        },
      };
    case UPDATE_CLINIC_PHOTO_FAILURE:
      return {
        ...state,
        clinicActions: {
          ...state.clinicActions,
          isUpdating: false,
          error: payload,
        },
      };
    default:
      return state;
  }
};

export default clinic;
