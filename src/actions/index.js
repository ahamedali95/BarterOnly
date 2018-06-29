const setCategories = (categories) => {
  return {type: "SET_CATEGORIES", payload: categories};
}

const setProductListings = (product_listings) => {
  return {type: "SET_PRODUCT_LISTINGS", payload: product_listings};
}

module.exports = {
  setCategories,
  setProductListings
};
