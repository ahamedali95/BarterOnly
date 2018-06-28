import React, { Component } from 'react';
import Categories from "./Categories.js";
import ProductListings from "./ProductListings.js";

class ProductListingContainer extends Component {
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
