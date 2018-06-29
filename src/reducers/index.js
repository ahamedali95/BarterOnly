const initialState = {
  categories: [],
  productListings: [],
  searchTerm: "",
  categorySelected: null
};

function reducer(state = initialState, action) {
  console.log(action.type)
  switch(action.type) {
    case "SELECT_CATEGORY":
      return {...state, categorySelected: action.payload};
    case "SET_PRODUCT_LISTINGS_AND_CATEGORIES":
      return {...state, productListings: action.payload.productListings, categories: action.payload.categories}
    default:
      return state;
  }
}

export default reducer;
