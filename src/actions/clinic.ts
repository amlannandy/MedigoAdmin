import {
  FETCH_CLINIC_REQUEST,
  FETCH_CLINIC_SUCCESS,
  FETCH_CLINIC_FAILURE,
} from '../constants/index';
import { clinicsCollection } from '../utils/firebase';

export const fetchClinic = (id: string) => {
  return dispatch => {
    dispatch(request());
    clinicsCollection
      .doc(id)
      .get()
      .then(doc => {
        const data = doc.data();
        const clinic = {
          id: doc.id,
          ...data,
        };
        dispatch(success(clinic));
      })
      .catch(err => dispatch(failure(err.message)));
  };
  function request() {
    return { type: FETCH_CLINIC_REQUEST };
  }
  function success(data: object) {
    return { type: FETCH_CLINIC_SUCCESS, payload: data };
  }
  function failure(error: string) {
    return { type: FETCH_CLINIC_FAILURE, payload: error };
  }
};
