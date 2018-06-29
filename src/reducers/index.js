const initialState = {
  items: ["helolo"]
};

function reducer(state = initialState, action) {
  switch(action.type) {
    case "SELECT_PLAYER":
      break;
    default:
      return state;
  }
}

export default reducer;
