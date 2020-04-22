const InitialState = {
  isAuthenticated: false,
};

const reducer = (state = InitialState, action) => {
  if (action.type === "HAS_AUTHENTICATED") {
    return { isAuthenticated: true };
  }
  if (action.type === "HAS_LOGGED_OUT") {
    return { isAuthenticated: false };
  }
  return state;
};

export default reducer;
