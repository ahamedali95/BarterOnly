const initialState = {
  categories: [],
  productListings: [],
  searchTerm: "",
  sortByOption: "Relevance",
  categorySelected: null
};

function reducer(state = initialState, action) {
  console.log(action.type)
  switch(action.type) {
    case "SELECT_CATEGORY":
      return {...state, categorySelected: action.payload};
    case "SET_PRODUCT_LISTINGS_AND_CATEGORIES":
      return {...state, productListings: action.payload.productListings, categories: action.payload.categories};
    case "UPDATE_SEARCH_TERM":
      return {...state, searchTerm: action.payload};
    case "UPDATE_SORT_BY_OPTION":
      return {...state, sortByOption: action.payload};
    default:
      return state;
  }
}

export default reducer;
