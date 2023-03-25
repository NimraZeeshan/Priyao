export const LOGIN_SUCCESSFUL = "LOGIN_SUCCESSFUL";

export const login = () => (dispatch, getState) => {
  // console.log("Asdasiud asiud au");
  dispatch({
    type: LOGIN_SUCCESSFUL,
    payload: true,
  });
};
