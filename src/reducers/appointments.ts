import {
  FETCH_APPOINTMENTS_REQUEST,
  FETCH_APPOINTMENTS_SUCCESS,
  FETCH_APPOINTMENTS_FAILURE,
} from '../constants/index';

export interface AppointmentState {
  appointments: Array<object>;
  appointmentActions: {
    isFetching: boolean;
    error: string;
    message: string;
  };
}

const initialState: AppointmentState = {
  appointments: [],
  appointmentActions: {
    isFetching: false,
    error: '',
    message: '',
  },
};

const appointments = (state: AppointmentState = initialState, action: any) => {
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
    default:
      return state;
  }
};

export default appointments;
