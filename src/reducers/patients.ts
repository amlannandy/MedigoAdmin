import {
  FETCH_PATIENTS_REQUEST,
  FETCH_PATIENTS_SUCCESS,
  FETCH_APPOINTMENTS_FAILURE,
} from '../constants/index';

interface PatientState {
  name: string;
  age: number;
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
    error: string;
    message: string;
  };
}

const initialState: PatientsState = {
  patient: null,
  patients: [],
  patientActions: {
    isFetching: false,
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
    case FETCH_APPOINTMENTS_FAILURE:
      return {
        ...state,
        patientActions: {
          ...state.patientActions,
          isFetching: false,
          error: payload,
        },
      };
    default:
      return state;
  }
};

export default reducer;
