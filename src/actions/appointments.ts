import { appointmentsCollection } from '../utils/firebase';
import {
  FETCH_APPOINTMENTS_REQUEST,
  FETCH_APPOINTMENTS_SUCCESS,
  FETCH_APPOINTMENTS_FAILURE,
} from '../constants/index';

export const fetchAppointments = (doctorId: string) => {
  return (dispatch: any) => {
    dispatch(request());
    appointmentsCollection
      .where('doctorId', '==', doctorId)
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
