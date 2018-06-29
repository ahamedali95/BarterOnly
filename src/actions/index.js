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

module.exports = {
  setProductListingsAndCategories,
  updateSearchTerm
};
