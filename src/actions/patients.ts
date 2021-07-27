import { patientsCollection } from '../utils/firebase';
import {
  FETCH_PATIENTS_REQUEST,
  FETCH_PATIENTS_SUCCESS,
  FETCH_PATIENTS_FAILURE,
  DELETE_PATIENT_REQUEST,
  DELETE_PATIENT_SUCCESS,
  DELETE_PATIENT_FAILURE,
} from '../constants/patients';

export const fetchPatients = (doctorId: string) => {
  return dispatch => {
    dispatch(request());
    patientsCollection
      .where('doctorId', '==', doctorId)
      .get()
      .then(snapshot => {
        const docs = snapshot.docs;
        const patients = docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
          };
        });
        dispatch(success(patients));
      })
      .catch(err => dispatch(failure(err.message)));
  };
  function request() {
    return { type: FETCH_PATIENTS_REQUEST };
  }
  function success(data: any) {
    return { type: FETCH_PATIENTS_SUCCESS, payload: data };
  }
  function failure(error: string) {
    return { type: FETCH_PATIENTS_FAILURE, payload: error };
  }
};

export const deletePatient = (id: string, callback: () => void) => {
  return dispatch => {
    dispatch(request());
    patientsCollection
      .doc(id)
      .delete()
      .then(() => {
        dispatch(success());
        callback();
      })
      .catch(err => dispatch(failure(err.message)));
  };
  function request() {
    return { type: DELETE_PATIENT_REQUEST };
  }
  function success() {
    return { type: DELETE_PATIENT_SUCCESS };
  }
  function failure(error: string) {
    return { type: DELETE_PATIENT_FAILURE, payload: error };
  }
};
