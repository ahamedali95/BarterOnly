import React, { Component } from 'react';
import Categories from "./Categories.js";
import ProductListingsCollection from "./ProductListingsCollection.js";
import adapter from "../adapter.js";
import {connect} from "react-redux";
import {setProductListingsAndCategories} from "../actions/index.js";

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

  render() {
    console.log("PRODUCT LISITING CONTAINER", this.props)
    return (
      <div>
        <Categories/>
        <ProductListingsCollection/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories,
    productListings: state.productListings
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setProductListingsAndCategories: (product_listings, categories) => {
      dispatch(setProductListingsAndCategories(product_listings, categories))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductListingContainer);
