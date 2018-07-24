const initialState = {
  categories: [],
  productListings: [],
  users: [],
  purchases: [],
  searchTerm: "",
  sortByOption: "Relevance",
  categorySelected: "All",
  currentProductListing: null,
};

function reducer(state = initialState, action) {
  console.log(action.type)
  switch(action.type) {
    case "SET_CATEGORY_AND_RESET_SEARCH_TERM_AND_SORT_OPTION":
      return {...state, searchTerm: "", sortByOption: "Relevance", categorySelected: action.payload, currentProductListing: null};
    case "SET_PRODUCT_LISTINGS_AND_CATEGORIES_AND_USERS":
      return {...state, productListings: action.payload.productListings, categories: action.payload.categories, users: action.payload.users};
    case "UPDATE_SEARCH_TERM":
      return {...state, searchTerm: action.payload};
    case "UPDATE_SORT_BY_OPTION":
      return {...state, sortByOption: action.payload};
    case "UPDATE_PRODUCT_LISTINGS":
      return {...state, productListings: action.payload};
    case "SELECT_PRODUCT_LISTING":
      return {...state, currentProductListing: action.payload};
    case "REMOVE_CURRENT_PRODUCT_LISTING":
      return {...state, currentProductListing: action.payload};
    case "SET_PURCHASES":
      return {...state, purchases: action.payload}
    default:
      return state;
  }
}

export default reducer;
