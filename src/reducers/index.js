const initialState = {
  categories: [],
  productListings: []
};

function reducer(state = initialState, action) {
  switch(action.type) {
    case "SET_CATEGORIES":
      return {...state, categories: action.payload}
    case "SET_PRODUCT_LISTINGS":
      return {...state, productListings: action.payload}
    default:
      return state;
  }
}

export default reducer;
