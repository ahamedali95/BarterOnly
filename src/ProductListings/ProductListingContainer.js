import React, { Component } from 'react';
import Categories from "./Categories.js";
import ProductListingsCollection from "./ProductListingsCollection.js";
import SearchField from "./SearchField.js";
import SortSelection from "./SortSelection.js";
import adapter from "../adapter.js";
import { connect } from "react-redux";
import { setProductListingsAndCategories, updateSearchTerm, updateSortByOption } from "../actions/index.js";

class ProductListingContainer extends Component {
  componentDidMount() {
    Promise.all([
      adapter.get("categories"),
      adapter.get("product_listings")
    ])
    .then(([response1, response2]) => Promise.all([response1.json(), response2.json()]))
    .then(([categories, productListings]) => {
      this.props.setProductListingsAndCategories(productListings, categories);
    });
  }

  //A callback function that will be invoked when there is a onchange event
  //triggered in the searchField component(child component). This function
  //then updates the global state.
  filterProductListings = (searchTerm) => {
    this.props.updateSearchTerm(searchTerm);
  }

  sortProductListings = (option) => {
    console.log(option)
    this.props.updateSortByOption(option);
  }

  render() {
    return (
      <div>
        <Categories/>
        <SearchField filterProductListings={this.filterProductListings}/>
        <SortSelection sortProductListings={this.sortProductListings}/>
        <ProductListingsCollection/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories,
    productListings: state.productListings
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setProductListingsAndCategories: (product_listings, categories) => {
      dispatch(setProductListingsAndCategories(product_listings, categories));
    },
    updateSearchTerm: (searchTerm) => {
      dispatch(updateSearchTerm(searchTerm));
    },
    updateSortByOption: (option) => {
      dispatch(updateSortByOption(option))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductListingContainer);
