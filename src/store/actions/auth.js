import Doctor from '../../models/Doctor';
import { auth, doctorsCollection } from '../../utils/firebase';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const AUTHENTICATE = 'AUTHENTICATE';
export const SET_AUTH_ERROR = 'SET_AUTH_ERROR';
export const TOGGLE_AUTH_LOADING = 'TOGGLE_AUTH_LOADING';

export const login = loginData => async dispatch => {
  try {
    dispatch({ type: TOGGLE_AUTH_LOADING, payload: true });
    const { email, password } = loginData;
    const res = await auth.signInWithEmailAndPassword(email, password);
    const userId = res.user.uid;
    const user = await getCurrentUserProfile(userId);
    if (!user) {
      dispatch({
        type: SET_AUTH_ERROR,
        payload: 'Please complete your registration in the Mobile application',
      });
      return;
    }
    if (!user.isVerified) {
      dispatch({
        type: SET_AUTH_ERROR,
        payload: 'Please verify your account first',
      });
      return;
    }
    dispatch({ type: LOGIN, payload: user });
  } catch (error) {
    dispatch({ type: SET_AUTH_ERROR, payload: error.message });
  }
};

export const getCurrentUser = () => async dispatch => {
  try {
    dispatch({ type: TOGGLE_AUTH_LOADING, payload: true });
    auth.onAuthStateChanged(async firebaseUser => {
      if (!firebaseUser) {
        dispatch({ type: TOGGLE_AUTH_LOADING, payload: false });
        return;
      }
      const userId = firebaseUser.uid;
      const user = await getCurrentUserProfile(userId);
      if (!user) {
        dispatch({ type: TOGGLE_AUTH_LOADING, payload: false });
        return;
      }
      if (!user.isVerified) {
        dispatch({
          type: SET_AUTH_ERROR,
          payload: 'Please verify your account first',
        });
        return;
      }
      dispatch({ type: AUTHENTICATE, payload: user });
    });
  } catch (error) {
    dispatch({ type: TOGGLE_AUTH_LOADING, payload: false });
  }
};

export const logOut = () => async dispatch => {
  dispatch({ type: TOGGLE_AUTH_LOADING, payload: true });
  await auth.signOut();
  dispatch({ type: LOGOUT, payload: false });
};

export const setAuthError = message => dispatch => {
  dispatch({ type: SET_AUTH_ERROR, payload: message });
};

const getCurrentUserProfile = async userId => {
  const res = await doctorsCollection.doc(userId).get();
  const doc = res.data();
  if (!doc) {
    return null;
  }
  return new Doctor(userId, doc);
};
