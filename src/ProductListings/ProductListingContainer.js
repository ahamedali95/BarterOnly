import React, { Component } from "react";
import Categories from "./Categories.js";
import ProductListingsCollection from "./ProductListingsCollection.js";
import SearchField from "./SearchField.js";
import SortSelection from "./SortSelection.js";
import adapter from "../adapter.js";
import { connect } from "react-redux";
import { removeCurrentProductListing, setProductListingsAndCategoriesAndUsers, updateProductListings } from "../actions/index.js";
import LineGraph from "./LineGraph.js";

class ProductListingContainer extends Component {
  componentDidMount() {
    //This is important because if the comes back to this page from viewing
    //the product details, we would like to reset the currently seelcted
    //product listing to null so that the details page won't render;
    this.props.removeCurrentProductListing();
    Promise.all([
      adapter.get("categories"),
      adapter.get("product_listings"),
      adapter.get("users")
    ])
    .then(([response1, response2, response3]) => Promise.all([response1.json(), response2.json(), response3.json()]))
    .then(([categories, productListings, users]) => {

      //Filter the product listings so that we can products which are not sold.
      // productListings = productListings.filter((productListingObj) => {
      //   return !productListingObj.isSold
      // });
      //We are doing this in ProductListingsCollection.js because if I do this here,
      //then myListings will show only products which are sold, not ALL products.
      this.props.setProductListingsAndCategoriesAndUsers(productListings, categories, users);
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
  //This is important because once we mount we are setting the product listings to
  //an empty array so that our private listings won't render all product listings
  //and then go on to fetch private listings in the componentDidMount
  componentWillUnmount() {
    console.log("I am called")
    this.props.updateProductListings([]);
  }

  render() {
    return (
      <div>
        <Categories/>
        {
          this.props.currentProductListing === null ?
            <div id="wrapper-for-search-sort-by">
              <h1 id="heading-for-search-sort-by">Search Here For Whats Wanted:</h1>
              <SearchField/>
              <SortSelection/>
            </div>
            :
            null
        }
        <ProductListingsCollection/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentProductListing: state.currentProductListing
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setProductListingsAndCategoriesAndUsers: (product_listings, categories, users, purchases) => {
      dispatch(setProductListingsAndCategoriesAndUsers(product_listings, categories, users, purchases));
    },
    removeCurrentProductListing: () => {
      dispatch(removeCurrentProductListing());
    },
    updateProductListings: (productListings) => {
      dispatch(updateProductListings(productListings));
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductListingContainer);
