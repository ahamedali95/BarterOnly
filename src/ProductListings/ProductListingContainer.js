import React, { Component } from "react";
import Categories from "./Categories.js";
import ProductListingsCollection from "./ProductListingsCollection.js";
import SearchField from "./SearchField.js";
import SortSelection from "./SortSelection.js";
import adapter from "../adapter.js";
import { connect } from "react-redux";
import { setProductListingsAndCategories } from "../actions/index.js";

class ProductListingContainer extends Component {
  componentDidMount() {
    Promise.all([
      adapter.get("categories"),
      adapter.get("product_listings")
    ])
    .then(([response1, response2]) => Promise.all([response1.json(), response2.json()]))
    .then(([categories, productListings]) => {
      //Filter the product listings so that we can products which are not sold.
      productListings = productListings.filter((productListingObj) => {
        return !productListingObj.isSold
      });
      this.props.setProductListingsAndCategories(productListings, categories);
    });
  }

  //A callback function that will be invoked when there is a onclick event
  //triggered in the Categories component(child component). This function
  //then sets the categorySelected in the global state.
  // productListingsByCategory = (categoryName) => {
  //   //Find the category id so that we can filter preoduct listing based on the this
  //   //category since each product listing contains category id to associate
  //   //with a category.
  //   const categoryId = this.props.categories.find((categoryObj) => {
  //     return categoryObj.name === categoryName;
  //   }).id
  //
  //   this.props.setCategoryAndResetSearchTermAndSortOption(categoryId);
  // }

  //A callback function that will be invoked when there is a onchange event
  //triggered in the searchField component(child component). This function
  //then updates the searchTerm in the global state.
  // filterProductListings = (searchTerm) => {
  //   this.props.updateSearchTerm(searchTerm);
  // }

  //A callback function that will be invoked when there is a onchange event
  //triggered in the SortSelection component(child component). This function
  //then updates sortByOption in the global state.
  // sortProductListings = (option) => {
  //   console.log(option)
  //   this.props.updateSortByOption(option);
  // }

  render() {
    return (
      <div>
        <Categories/>
        <SearchField/>
        <SortSelection/>
        <ProductListingsCollection/>
      </div>
    );
  }
}

// function mapStateToProps(state) {
//   return {
//     categories: state.categories,
//     productListings: state.productListings
//   };
// }

function mapDispatchToProps(dispatch) {
  return {
    setProductListingsAndCategories: (product_listings, categories) => {
      dispatch(setProductListingsAndCategories(product_listings, categories));
    }
    // setCategoryAndResetSearchTermAndSortOption: (categoryId) => {
    //   dispatch(setCategoryAndResetSearchTermAndSortOption(categoryId));
    // },
    // updateSearchTerm: (searchTerm) => {
    //   dispatch(updateSearchTerm(searchTerm));
    // },
    // updateSortByOption: (option) => {
    //   dispatch(updateSortByOption(option));
    // }
  };
}

export default connect(null, mapDispatchToProps)(ProductListingContainer);
