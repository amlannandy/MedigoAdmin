import {
  auth,
  firebase,
  doctorsCollection,
  clinicsCollection,
  storage,
  getGeopoint,
} from '../utils/firebase';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAILURE,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAILURE,
  DELETE_ACCOUNT_REQUEST,
  DELETE_ACCOUNT_SUCCESS,
  DELETE_ACCOUNT_FAILURE,
  REMOVE_AUTH_MESSAGE,
  REMOVE_AUTH_ERROR,
  VERIFY_PASSWORD_REQUEST,
  VERIFY_PASSWORD_SUCCESS,
  VERIFY_PASSWORD_FAILURE,
  RELOAD_USER_REQUEST,
  RELOAD_USER_SUCCESS,
  RELOAD_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  UPDATE_EMAIL_REQUEST,
  UPDATE_EMAIL_SUCCESS,
  UPDATE_EMAIL_FAILURE,
  UPDATE_PHOTO_REQUEST,
  UPDATE_PHOTO_SUCCESS,
  UPDATE_PHOTO_FAILURE,
  LOAD_INCOMPLETE_USER,
  COMPLETE_PROFILE_REQUEST,
  COMPLETE_PROFILE_SUCCESS,
  COMPLETE_PROFILE_FAILURE,
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
        dispatch(loadUser(auth.currentUser));
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

export const register = (
  email: string,
  password: string,
  callback: Function
) => {
  return dispatch => {
    dispatch(request());
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        dispatch(loadUser());
        dispatch(success());
        callback();
      })
      .catch(err => dispatch(failure(err.message)));
  };
  function request() {
    return { type: REGISTER_REQUEST };
  }
  function success() {
    return { type: REGISTER_SUCCESS };
  }
  function failure(error: string) {
    return { type: REGISTER_FAILURE, payload: error };
  }
};

export const completeProfile = (data: any) => {
  return dispatch => {
    dispatch(request());
    const user = auth.currentUser;
    storage
      .ref(`profilePhotos/${user.uid}/`)
      .put(data.image)
      .then(snapshot => {
        snapshot.ref
          .getDownloadURL()
          .then(imageUrl => {
            const body = {
              ...data,
              email: user.email,
              location: getGeopoint(6, 9),
              imageUrl,
            };
            delete body.image;
            doctorsCollection
              .doc(user.uid)
              .set(body)
              .then(() => {
                dispatch(success());
                dispatch(loadUser(user));
              })
              .catch(err => dispatch(failure(err.message)));
          })
          .catch(err => dispatch(failure(err.message)));
      })
      .catch(err => dispatch(failure(err.message)));
  };
  function request() {
    return { type: COMPLETE_PROFILE_REQUEST };
  }
  function success() {
    return { type: COMPLETE_PROFILE_SUCCESS };
  }
  function failure(error: string) {
    return { type: COMPLETE_PROFILE_FAILURE, payload: error };
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
          dispatch(incomplete());
        }
      })
      .catch(() => dispatch(incomplete()));
  };
  function request() {
    return { type: LOAD_USER_REQUEST };
  }
  function success(data: any) {
    return { type: LOAD_USER_SUCCESS, payload: data };
  }
  function failure() {
    return { type: LOAD_USER_FAILURE };
  }
  function incomplete() {
    return { type: LOAD_INCOMPLETE_USER };
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

export const updatePassword = (newPassword: string) => {
  return dispatch => {
    dispatch(request());
    const user = auth.currentUser;
    user
      .updatePassword(newPassword)
      .then(() => {
        dispatch(success('Password updated'));
        setTimeout(() => {
          dispatch(removeMessage());
        }, 3000);
      })
      .catch(err => {
        dispatch(failure(err.message));
        setTimeout(() => {
          dispatch(removeError());
        }, 3000);
      });
  };
  function request() {
    return { type: UPDATE_PASSWORD_REQUEST };
  }
  function success(data) {
    return { type: UPDATE_PASSWORD_SUCCESS, payload: data };
  }
  function failure(error: string) {
    return { type: UPDATE_PASSWORD_FAILURE, payload: error };
  }
  function removeMessage() {
    return { type: REMOVE_AUTH_MESSAGE };
  }
  function removeError() {
    return { type: REMOVE_AUTH_ERROR };
  }
};

export const verifyPassword = (
  email: string,
  password: string,
  callback: Function
) => {
  return dispatch => {
    dispatch(request());
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        callback();
        dispatch(success());
      })
      .catch(err => dispatch(failure(err.message)));
  };
  function request() {
    return { type: VERIFY_PASSWORD_REQUEST };
  }
  function success() {
    return { type: VERIFY_PASSWORD_SUCCESS };
  }
  function failure(error: string) {
    return { type: VERIFY_PASSWORD_FAILURE, payload: error };
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

export const reloadUser = () => {
  return dispatch => {
    dispatch(request());
    const user = auth.currentUser;
    const userId = user.uid;
    doctorsCollection
      .doc(userId)
      .get()
      .then(snapshot => {
        if (snapshot.exists) {
          const userDoc = snapshot.data() as object;
          dispatch(success({ ...userDoc, id: userId }));
        } else {
          dispatch(incomplete());
        }
      })
      .catch(err => dispatch(failure(err.message)));
  };
  function request() {
    return { type: RELOAD_USER_REQUEST };
  }
  function success(data: any) {
    return { type: RELOAD_USER_SUCCESS, payload: data };
  }
  function failure(error: string) {
    return { type: RELOAD_USER_FAILURE, payload: error };
  }
  function incomplete() {
    return { type: LOAD_INCOMPLETE_USER };
  }
};

export const updateUser = (id: string, data: any, callback: Function) => {
  return dispatch => {
    dispatch(request());
    doctorsCollection
      .doc(id)
      .update(data)
      .then(() => {
        dispatch(success());
        callback();
      })
      .catch(err => dispatch(failure(err.message)));
  };
  function request() {
    return { type: UPDATE_USER_REQUEST };
  }
  function success() {
    return { type: UPDATE_USER_SUCCESS };
  }
  function failure(error: string) {
    return { type: UPDATE_USER_FAILURE, payload: error };
  }
};

export const changeEmail = (email: string, callback: Function) => {
  return dispatch => {
    dispatch(request());
    const user = auth.currentUser;
    user
      .updateEmail(email)
      .then(() => {
        doctorsCollection
          .doc(user.uid)
          .update({ email })
          .then(() => {
            dispatch(success());
            callback();
          })
          .catch(err => dispatch(failure(err.message)));
      })
      .catch(err => dispatch(failure(err.message)));
  };
  function request() {
    return { type: UPDATE_EMAIL_REQUEST };
  }
  function success() {
    return { type: UPDATE_EMAIL_SUCCESS };
  }
  function failure(error: string) {
    return { type: UPDATE_EMAIL_FAILURE, payload: error };
  }
};

export const updatePhoto = (id: string, file: any, callback: Function) => {
  return dispatch => {
    dispatch(request());
    storage
      .ref(`profilePhotos/${id}/`)
      .put(file)
      .then(snapshot => {
        snapshot.ref
          .getDownloadURL()
          .then(imageUrl => {
            doctorsCollection
              .doc(id)
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
    return { type: UPDATE_PHOTO_REQUEST };
  }
  function success() {
    return { type: UPDATE_PHOTO_SUCCESS };
  }
  function failure(error: string) {
    return { type: UPDATE_PHOTO_FAILURE, payload: error };
  }
};
