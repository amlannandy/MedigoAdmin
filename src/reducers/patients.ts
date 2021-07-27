import {
  FETCH_PATIENTS_REQUEST,
  FETCH_PATIENTS_SUCCESS,
  FETCH_PATIENTS_FAILURE,
  DELETE_PATIENT_REQUEST,
  DELETE_PATIENT_SUCCESS,
  DELETE_PATIENT_FAILURE,
} from '../constants/index';

interface PatientState {
  id: string;
  name: string;
  age: number;
  gender: string;
  address: {
    address: string;
    city: string;
    pincode: string;
  };
  healthInfo: {
    height: number;
    weight: number;
    isDiabetic: boolean;
  };
  doctorId: string;
}

export interface PatientsState {
  patient: PatientState;
  patients: Array<PatientState>;
  patientActions: {
    isFetching: boolean;
    isDeleting: boolean;
    error: string;
    message: string;
  };
}

const initialState: PatientsState = {
  patient: null,
  patients: [],
  patientActions: {
    isFetching: false,
    isDeleting: false,
    error: '',
    message: '',
  },
};

const reducer = (state: PatientsState = initialState, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_PATIENTS_REQUEST:
      return {
        ...state,
        patientActions: {
          ...state.patientActions,
          isFetching: true,
        },
      };
    case FETCH_PATIENTS_SUCCESS:
      return {
        ...state,
        patients: payload,
        patientActions: {
          ...state.patientActions,
          isFetching: false,
        },
      };
    case FETCH_PATIENTS_FAILURE:
      return {
        ...state,
        patientActions: {
          ...state.patientActions,
          isFetching: false,
          error: payload,
        },
      };
    case DELETE_PATIENT_REQUEST:
      return {
        ...state,
        patientActions: {
          ...state.patientActions,
          isDeleting: true,
        },
      };
    case DELETE_PATIENT_SUCCESS:
      return {
        ...state,
        patientActions: {
          ...state.patientActions,
          isDeleting: false,
        },
      };
    case DELETE_PATIENT_FAILURE:
      return {
        ...state,
        patientActions: {
          ...state.patientActions,
          isDeleting: false,
          error: payload,
        },
      };
    default:
      return state;
  }
};

export default reducer;