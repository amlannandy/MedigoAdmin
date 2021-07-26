import { auth, firebase, doctorsCollection } from '../utils/firebase';

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
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
      .then(res => {
        console.log(res);
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
