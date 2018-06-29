import React, { Component } from 'react';
import Categories from "./Categories.js";
import ProductListingsCollection from "./ProductListingsCollection.js";
import adapter from "../adapter.js";
import {connect} from "react-redux";
import {setCategories, setProductListings} from "../actions/index.js";

class ProductListingContainer extends Component {
  componentDidMount() {
    Promise.all([
      adapter.get("categories"),
      adapter.get("product_listings")
    ])
      .then(([response1, response2]) => Promise.all([response1.json(), response2.json()]))
      .then(([categories, productListings]) => {
        
        this.props.setProductListings(productListings);
        this.props.setCategories(categories);
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
    setCategories: (categories) => {
      dispatch(setCategories(categories));
    },
    setProductListings: (product_listings) => {
      dispatch(setProductListings(product_listings));
    },

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductListingContainer);
