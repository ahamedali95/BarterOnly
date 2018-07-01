const setProductListingsAndCategories = (productListings, categories) => {
  return {
    type: "SET_PRODUCT_LISTINGS_AND_CATEGORIES",
    payload: {
    productListings: productListings,
    categories: categories
  }};
}

const updateSearchTerm = (searchTerm) => {
  return {
    type: "UPDATE_SEARCH_TERM",
    payload: searchTerm
  }
}

const updateSortByOption = (option) => {
  return {
    type: "UPDATE_SORT_BY_OPTION",
    payload: option
  }
}

module.exports = {
  setProductListingsAndCategories,
  updateSearchTerm,
  updateSortByOption
};
