import {
  FETCH_CLINIC_REQUEST,
  FETCH_CLINIC_SUCCESS,
  FETCH_CLINIC_FAILURE,
  DELETE_CLINIC_REQUEST,
  DELETE_CLINIC_SUCCESS,
  DELETE_CLINIC_FAILURE,
} from '../constants/index';
import { clinicsCollection, doctorsCollection } from '../utils/firebase';

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

export const deleteClinic = (id: string, doctorId: string) => {
  return dispatch => {
    dispatch(request());
    clinicsCollection
      .doc(id)
      .delete()
      .then(() => {
        doctorsCollection
          .doc(doctorId)
          .update({ clinicId: null })
          .then(() => dispatch(success()));
      })
      .catch(err => dispatch(failure(err.message)));
  };
  function request() {
    return { type: DELETE_CLINIC_REQUEST };
  }
  function success() {
    return { type: DELETE_CLINIC_SUCCESS };
  }
  function failure(error: string) {
    return { type: DELETE_CLINIC_FAILURE, payload: error };
  }
};
