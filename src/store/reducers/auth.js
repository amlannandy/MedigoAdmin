import { LOGIN, AUTHENTICATE } from '../actions/auth';

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
  error: null,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGIN:
    case AUTHENTICATE:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: payload,
      };
    default:
      return state;
  }
};

export default reducer;
