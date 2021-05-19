const formReducer = (state, action) => {
  return {
    ...state,
    [action.name]: action.value,
  };
};

export default formReducer;
