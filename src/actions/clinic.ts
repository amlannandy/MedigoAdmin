import {
  FETCH_CLINIC_REQUEST,
  FETCH_CLINIC_SUCCESS,
  FETCH_CLINIC_FAILURE,
  DELETE_CLINIC_REQUEST,
  DELETE_CLINIC_SUCCESS,
  DELETE_CLINIC_FAILURE,
  ADD_CLINIC_REQUEST,
  ADD_CLINIC_SUCCESS,
  ADD_CLINIC_FAILURE,
  UPDATE_CLINIC_PHOTO_REQUEST,
  UPDATE_CLINIC_PHOTO_SUCCESS,
  UPDATE_CLINIC_PHOTO_FAILURE,
  UPDATE_CLINIC_DETAILS_REQUEST,
  UPDATE_CLINIC_DETAILS_SUCCESS,
  UPDATE_CLINIC_DETAILS_FAILURE,
} from '../constants/index';
import {
  clinicsCollection,
  doctorsCollection,
  storage,
  getGeopoint,
} from '../utils/firebase';

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

export const addClinic = (data: any, imageFile: any, callback: Function) => {
  return dispatch => {
    dispatch(request());
    storage
      .ref(`clinicPhotos/${data.doctorId}/`)
      .put(imageFile)
      .then(snapshot => {
        snapshot.ref
          .getDownloadURL()
          .then(imageUrl => {
            const location = getGeopoint(
              data.location.latitude,
              data.location.longitude
            );
            const clinicData = {
              ...data,
              imageUrl,
              location,
            };
            clinicsCollection
              .add(clinicData)
              .then(docRef => {
                docRef
                  .get()
                  .then(doc => {
                    const id = doc.id;
                    const data = doc.data();
                    const clinic: any = {
                      id,
                      ...data,
                    };
                    doctorsCollection
                      .doc(clinic.doctorId)
                      .update({
                        clinicId: id,
                      })
                      .then(() => {
                        dispatch(success(clinic));
                        callback();
                      })
                      .catch(err => dispatch(failure(err.message)));
                  })
                  .catch(err => dispatch(failure(err.message)));
              })
              .catch(err => dispatch(failure(err.message)));
          })
          .catch(err => dispatch(failure(err.message)));
      });
  };
  function request() {
    return { type: ADD_CLINIC_REQUEST };
  }
  function success(data: any) {
    return { type: ADD_CLINIC_SUCCESS, payload: data };
  }
  function failure(error: string) {
    return { type: ADD_CLINIC_FAILURE, payload: error };
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

export const updateClinicPhoto = (
  clinicId: string,
  doctorId: string,
  imageFile: any,
  callback: Function
) => {
  return dispatch => {
    dispatch(request());
    storage
      .ref(`clinicPhotos/${doctorId}/`)
      .put(imageFile)
      .then(snapshot => {
        snapshot.ref
          .getDownloadURL()
          .then(imageUrl => {
            clinicsCollection
              .doc(clinicId)
              .update({ imageUrl })
              .then(() => {
                dispatch(success());
                callback();
              })
              .catch(err => dispatch(failure(err.message)));
          })
          .catch(err => dispatch(failure(err.message)));
      })
      .catch(err => dispatch(failure(err.message)));
  };
  function request() {
    return { type: UPDATE_CLINIC_PHOTO_REQUEST };
  }
  function success() {
    return { type: UPDATE_CLINIC_PHOTO_SUCCESS };
  }
  function failure(error: string) {
    return { type: UPDATE_CLINIC_PHOTO_FAILURE, payload: error };
  }
};

export const updateClinicDetails = (
  id: string,
  data: any,
  callback: Function
) => {
  return dispatch => {
    dispatch(request());
    clinicsCollection
      .doc(id)
      .update(data)
      .then(() => {
        dispatch(success());
        callback();
      })
      .catch(err => dispatch(failure(err.message)));
  };
  function request() {
    return { type: UPDATE_CLINIC_DETAILS_REQUEST };
  }
  function success() {
    return { type: UPDATE_CLINIC_DETAILS_SUCCESS };
  }
  function failure(error: string) {
    return { type: UPDATE_CLINIC_DETAILS_FAILURE, payload: error };
  }
};
