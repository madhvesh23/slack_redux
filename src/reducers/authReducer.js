const initialState = {
  isAuth: null,
  loading: true,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_AUTH_STATUS":
      return { ...state, isAuth: true,loading: false};

    case "RESET_AUTH_STATUS":
      return { ...state, isAuth: false,loading: false };

    default:
      return state;
  }
};

export default authReducer;
