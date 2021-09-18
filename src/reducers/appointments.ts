import {
  FETCH_APPOINTMENTS_REQUEST,
  FETCH_APPOINTMENTS_SUCCESS,
  FETCH_APPOINTMENTS_FAILURE,
  CREATE_APPOINTMENT_REQUEST,
  CREATE_APPOINTMENT_SUCCESS,
  CREATE_APPOINTMENT_FAILURE,
} from '../constants/index';

export interface AppointmentsState {
  appointments: Array<object>;
  appointmentActions: {
    isFetching: boolean;
    isCreating: boolean;
    error: string;
    message: string;
  };
}

const initialState: AppointmentsState = {
  appointments: [],
  appointmentActions: {
    isFetching: false,
    isCreating: false,
    error: '',
    message: '',
  },
};

const appointments = (state: AppointmentsState = initialState, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_APPOINTMENTS_REQUEST:
      return {
        ...state,
        appointmentActions: {
          ...state.appointmentActions,
          isFetching: true,
        },
      };
    case FETCH_APPOINTMENTS_SUCCESS:
      return {
        ...state,
        appointments: payload,
        appointmentActions: {
          ...state.appointmentActions,
          isFetching: false,
        },
      };
    case FETCH_APPOINTMENTS_FAILURE:
      return {
        ...state,
        appointmentActions: {
          ...state.appointmentActions,
          isFetching: false,
          error: payload,
        },
      };
    case CREATE_APPOINTMENT_REQUEST:
      return {
        ...state,
        appointmentActions: {
          ...state.appointmentActions,
          isCreating: true,
        },
      };
    case CREATE_APPOINTMENT_SUCCESS:
      return {
        ...state,
        appointmentActions: {
          ...state.appointmentActions,
          isCreating: false,
        },
      };
    case CREATE_APPOINTMENT_FAILURE:
      return {
        ...state,
        appointmentActions: {
          ...state.appointmentActions,
          isCreating: false,
          error: payload,
        },
      };
    default:
      return state;
  }
};

export default appointments;
