import {
  FETCH_APPOINTMENTS_REQUEST,
  FETCH_APPOINTMENTS_SUCCESS,
  FETCH_APPOINTMENTS_FAILURE,
  CREATE_APPOINTMENT_REQUEST,
  CREATE_APPOINTMENT_SUCCESS,
  CREATE_APPOINTMENT_FAILURE,
  DELETE_APPOINTMENT_REQUEST,
  DELETE_APPOINTMENT_SUCCESS,
  DELETE_APPOINTMENT_FAILURE,
} from '../constants/index';

interface Appointment {
  id: string;
  doctorId: string;
  userId: string;
  date: string;
  time: string;
  reportId?: string;
  isBooked: boolean;
}

export interface AppointmentsState {
  appointments: Array<Appointment>;
  appointmentActions: {
    isFetching: boolean;
    isCreating: boolean;
    isDeleting: boolean;
    error: string;
    message: string;
  };
}

const initialState: AppointmentsState = {
  appointments: [],
  appointmentActions: {
    isFetching: false,
    isCreating: false,
    isDeleting: false,
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
    case DELETE_APPOINTMENT_REQUEST:
      return {
        ...state,
        appointmentActions: {
          ...state.appointmentActions,
          isDeleting: true,
        },
      };
    case DELETE_APPOINTMENT_SUCCESS:
      return {
        ...state,
        appointmentActions: {
          ...state.appointmentActions,
          isDeleting: false,
        },
      };
    case DELETE_APPOINTMENT_FAILURE:
      return {
        ...state,
        appointmentActions: {
          ...state.appointmentActions,
          isDeleting: false,
          error: payload,
        },
      };
    default:
      return state;
  }
};

export default appointments;
