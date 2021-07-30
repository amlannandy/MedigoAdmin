import {
  auth,
  firebase,
  doctorsCollection,
  clinicsCollection,
} from '../utils/firebase';

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  DELETE_ACCOUNT_REQUEST,
  DELETE_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT_FAILURE,
} from '../constants/index';

export const login = (
  email: string,
  password: string,
  callback: () => void
) => {
  return (dispatch: any) => {
    dispatch(request());
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        dispatch(loadUser());
        dispatch(success());
        callback();
      })
      .catch(err => {
        dispatch(failure(err.message));
      });
  };
  function request() {
    return { type: LOGIN_REQUEST };
  }
  function success() {
    return { type: LOGIN_SUCCESS };
  }
  function failure(error: string) {
    return { type: LOGIN_FAILURE, payload: error };
  }
};

export const loadUser = (user?: firebase.User) => {
  return (dispatch: any) => {
    dispatch(request());
    if (user == null) {
      dispatch(failure());
      return;
    }
    const userId = user.uid;
    doctorsCollection
      .doc(userId)
      .get()
      .then(snapshot => {
        if (snapshot.exists) {
          const userDoc = snapshot.data() as object;
          dispatch(success({ ...userDoc, id: userId }));
        } else {
          dispatch(failure());
        }
      })
      .catch(() => dispatch(failure()));
  };
  function request() {
    return { type: LOAD_USER_REQUEST };
  }
  function success(data: object) {
    return { type: LOAD_USER_SUCCESS, payload: data };
  }
  function failure() {
    return { type: LOAD_USER_FAILURE };
  }
};

export const logout = () => {
  return (dispatch: any) => {
    dispatch(request());
    auth
      .signOut()
      .then(() => dispatch(success()))
      .catch(err => dispatch(failure(err.message)));
  };
  function request() {
    return { type: LOGOUT_REQUEST };
  }
  function success() {
    return { type: LOGOUT_SUCCESS };
  }
  function failure(error: string) {
    return { type: LOGOUT_FAILURE, payload: error };
  }
};

export const deleteAccout = (clinicId?: string) => {
  return dispatch => {
    dispatch(request());
    const user = auth.currentUser;
    const userId = user.uid;
    user
      .delete()
      .then(() => {
        doctorsCollection
          .doc(userId)
          .delete()
          .then(() => {
            if (clinicId) {
              clinicsCollection
                .doc(clinicId)
                .delete()
                .then(() => dispatch(success()));
            } else {
              dispatch(success());
            }
          });
      })
      .then(() => dispatch(failure('Something went wrong!')));
    function request() {
      return { type: DELETE_ACCOUNT_REQUEST };
    }
    function success() {
      return { type: DELETE_ACCOUNT_SUCCESS };
    }
    function failure(error: string) {
      return { type: DELETE_ACCOUNT_FAILURE, payload: error };
    }
  };
};
