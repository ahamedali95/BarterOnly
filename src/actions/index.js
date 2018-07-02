const setProductListingsAndCategories = (productListings, categories) => {
  return {
    type: "SET_PRODUCT_LISTINGS_AND_CATEGORIES",
    payload: {
    productListings: productListings,
    categories: categories
  }};
}

const setCategoryAndResetSearchTermAndSortOption = (categoryId) => {
  return {
    type: "SET_CATEGORY_AND_RESET_SEARCH_TERM_AND_SORT_OPTION",
    payload: categoryId
  };
}

const updateSearchTerm = (searchTerm) => {
  return {
    type: "UPDATE_SEARCH_TERM",
    payload: searchTerm
  };
}

const updateSortByOption = (option) => {
  return {
    type: "UPDATE_SORT_BY_OPTION",
    payload: option
  };
}

const updateProductListings = (newProductListings) => {
  return {
    type: "UPDATE_PRODUCT_LISTINGS",
    payload: newProductListings
  };
}

module.exports = {
  setProductListingsAndCategories,
  setCategoryAndResetSearchTermAndSortOption,
  updateSearchTerm,
  updateSortByOption,
  updateProductListings
};
