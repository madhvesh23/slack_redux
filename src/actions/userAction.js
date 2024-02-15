export const setUser = (user) => (dispatch) => {
  dispatch({
    type: "SET_USER",
    payload: user,
  });
};

export const clearUser = () => ({
  type: "CLEAR_USER",
});

export const setAuthStatus = () => ({
  type: "SET_AUTH_STATUS",
});

export const resetAuthStatus = () => ({
  type: "RESET_AUTH_STATUS",
});

export const setLoading = (loading) => ({
  type: "SET_LOADING",
  payload: loading,
});