import { auth } from '../../utils/firebase';

export const LOGIN = 'LOGIN';
export const AUTHENTICATE = 'AUTHENTICATE';

export const login = loginData => async dispatch => {
  try {
    const { email, password } = loginData;
    const res = await auth.signInWithEmailAndPassword(email, password);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const getCurrentUser = () => async dispatch => {
  try {
    const user = await auth.currentUser;
    console.log(user);
  } catch (error) {}
};
