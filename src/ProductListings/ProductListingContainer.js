import React, { Component } from 'react';
import Categories from "./Categories.js";
import ProductListings from "./ProductListings.js";
import adapter from "../adapter.js";

class ProductListingContainer extends Component {
  componentDidMount() {
    fetch("http://localhost:3001/api/v1/categories");
  }

  render() {
    return (
      <div>
        <Categories/>
        <ProductListings/>
      </div>
    );
  }
}

export default ProductListingContainer;
