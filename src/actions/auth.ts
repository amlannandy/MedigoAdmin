import { auth } from '../utils/firebase';

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
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
        success();
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
