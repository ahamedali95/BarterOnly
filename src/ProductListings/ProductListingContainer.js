import React, { Component } from 'react';
import Categories from "./Categories.js";
import ProductListingsCollection from "./ProductListingsCollection.js";
import SearchField from "./SearchField.js";
import adapter from "../adapter.js";
import { connect } from "react-redux";
import { setProductListingsAndCategories, updateSearchTerm } from "../actions/index.js";

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
  //triggered in the search field(child component)
  filterProductListings = (searchTerm) => {
    console.log("search term is ", searchTerm)
    this.props.updateSearchTerm(searchTerm);
  }

  render() {
    return (
      <div>
        <Categories/>
        <SearchField filterProductListings={this.filterProductListings}/>
        <ProductListingsCollection/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories,
    productListings: state.productListings,
    searchTerm: state.searchTerm
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setProductListingsAndCategories: (product_listings, categories) => {
      dispatch(setProductListingsAndCategories(product_listings, categories));
    },
    updateSearchTerm: (searchTerm) => {
      dispatch(updateSearchTerm(searchTerm));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductListingContainer);
