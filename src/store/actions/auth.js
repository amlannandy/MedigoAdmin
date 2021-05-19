import { auth } from '../../utils/firebase';

export const LOGIN = 'LOGIN';
export const AUTHENTICATE = 'AUTHENTICATE';
export const SET_AUTH_ERROR = 'SET_AUTH_ERROR';
export const TOGGLE_AUTH_LOADING = 'TOGGLE_AUTH_LOADING';

export const login = loginData => async dispatch => {
  try {
    dispatch({ type: TOGGLE_AUTH_LOADING, payload: true });
    const { email, password } = loginData;
    const res = await auth.signInWithEmailAndPassword(email, password);
    const userId = res.user.uid;
    dispatch({ type: LOGIN, payload: userId });
  } catch (error) {
    dispatch({ type: SET_AUTH_ERROR, payload: error.message });
  }
};

export const getCurrentUser = () => async dispatch => {
  try {
    const user = await auth.currentUser;
    console.log(user);
  } catch (error) {}
};

export const setAuthError = message => dispatch => {
  dispatch({ type: SET_AUTH_ERROR, payload: message });
};
