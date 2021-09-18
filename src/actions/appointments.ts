import {
  appointmentsCollection,
  currentTimestamp,
  getTimestampFromDate,
} from '../utils/firebase';
import {
  FETCH_APPOINTMENTS_REQUEST,
  FETCH_APPOINTMENTS_SUCCESS,
  FETCH_APPOINTMENTS_FAILURE,
  CREATE_APPOINTMENT_REQUEST,
  CREATE_APPOINTMENT_SUCCESS,
  CREATE_APPOINTMENT_FAILURE,
} from '../constants/index';

export const fetchAppointments = (doctorId: string, date: string) => {
  return (dispatch: any) => {
    dispatch(request());
    appointmentsCollection
      .where('doctorId', '==', doctorId)
      .where('date', '==', date)
      .get()
      .then(snapshot => {
        const docs = snapshot.docs;
        const appointments = docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
          };
        });
        dispatch(success(appointments));
      })
      .catch(err => dispatch(failure(err.message)));
  };
  function request() {
    return { type: FETCH_APPOINTMENTS_REQUEST };
  }
  function success(data: any) {
    return { type: FETCH_APPOINTMENTS_SUCCESS, payload: data };
  }
  function failure(error: string) {
    return { type: FETCH_APPOINTMENTS_FAILURE, payload: error };
  }
};

export const createAppointment = (
  doctorId: string,
  date: string,
  startTime: string,
  endTime: string,
  successCallback: Function
) => {
  return (dispatch: any) => {
    dispatch(request());
    var startDate = new Date(`${date} ${startTime}:00`);
    var endDate = new Date(`${date} ${endTime}:00`);
    appointmentsCollection
      .doc()
      .set({
        doctorId,
        date,
        time: `${startTime} to ${endTime}`,
        doctorLastSeen: currentTimestamp,
        startTime: getTimestampFromDate(startDate),
        endTime: getTimestampFromDate(endDate),
      })
      .then(() => {
        dispatch(success());
        successCallback(date);
      })
      .catch(err => dispatch(failure(err.message)));
  };
  function request() {
    return { type: CREATE_APPOINTMENT_REQUEST };
  }
  function success() {
    return { type: CREATE_APPOINTMENT_SUCCESS };
  }
  function failure(error: string) {
    return { type: CREATE_APPOINTMENT_FAILURE, payload: error };
  }
};
