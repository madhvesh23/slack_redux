
const initialState = {
  loading: true,
};

const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };

    default:
      return state;
  }
};

export default loadingReducer;
