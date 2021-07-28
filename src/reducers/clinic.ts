import {
  FETCH_CLINIC_REQUEST,
  FETCH_CLINIC_SUCCESS,
  FETCH_CLINIC_FAILURE,
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
    isFetching: boolean;
    error: string;
    message: string;
  };
}

const initialState: ClinicState = {
  clinic: null,
  clinicActions: {
    isFetching: false,
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
    default:
      return state;
  }
};

export default clinic;