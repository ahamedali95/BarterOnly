const setProductListingsAndCategories = (productListings, categories) => {
  return {type: "SET_PRODUCT_LISTINGS_AND_CATEGORIES", payload: {
    productListings: productListings,
    categories: categories
  }};
}

module.exports = {
  setProductListingsAndCategories
};
