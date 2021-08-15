import { PatientState } from '../reducers/patients';
import { patientsCollection } from '../utils/firebase';
import {
  FETCH_PATIENTS_REQUEST,
  FETCH_PATIENTS_SUCCESS,
  FETCH_PATIENTS_FAILURE,
  ADD_PATIENT_REQUEST,
  ADD_PATIENT_SUCCESS,
  ADD_PATIENT_FAILURE,
  DELETE_PATIENT_REQUEST,
  DELETE_PATIENT_SUCCESS,
  DELETE_PATIENT_FAILURE,
  FETCH_PATIENT_REQUEST,
  FETCH_PATIENT_SUCCESS,
  FETCH_PATIENT_FAILURE,
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
            ...data,
            id: doc.id,
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

export const addPatient = (data: PatientState, callback: () => void) => {
  return dispatch => {
    dispatch(request());
    patientsCollection
      .add(data)
      .then(() => {
        dispatch(success());
        callback();
      })
      .catch(err => dispatch(failure(err.message)));
  };
  function request() {
    return { type: ADD_PATIENT_REQUEST };
  }
  function success() {
    return { type: ADD_PATIENT_SUCCESS };
  }
  function failure(error: string) {
    return { type: ADD_PATIENT_FAILURE, payload: error };
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

export const fetchPatient = (id: string) => {
  return dispatch => {
    dispatch(request());
    patientsCollection
      .doc(id)
      .get()
      .then(doc => {
        const data = doc.data();
        const patient = {
          id: doc.id,
          ...data,
        };
        dispatch(success(patient));
      })
      .catch(err => dispatch(failure(err.message)));
  };
  function request() {
    return { type: FETCH_PATIENT_REQUEST };
  }
  function success(data: any) {
    return { type: FETCH_PATIENT_SUCCESS, payload: data };
  }
  function failure(error: string) {
    return { type: FETCH_PATIENT_FAILURE, payload: error };
  }
};
