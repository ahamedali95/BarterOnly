const initialState = {
  categories: [],
  productListings: [],
  categorySelected: null
};

function reducer(state = initialState, action) {
  console.log(action.type)
  switch(action.type) {
    case "SET_CATEGORIES":
      return {...state, categories: action.payload};
    case "SET_PRODUCT_LISTINGS":
      return {...state, productListings: action.payload};
    case "SELECT_CATEGORY":
      return {...state, categorySelected: action.payload};
    default:
      return state;
  }
}

export default reducer;
