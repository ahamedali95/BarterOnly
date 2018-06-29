import React, { Component } from "react";
import ProductListing from "./ProductListing.js";
import { connect } from "react-redux";

const ProductListingsCollection = (props) => {
  //Filter product listings based on the search term so that we can render this in the return statement.
  const filterProductListings = props.productListings.filter((productListingObj) => {
    return productListingObj.name.toLowerCase().includes(props.searchTerm.toLowerCase());
  });

  return (
    <div>
    {
      filterProductListings.map((productListingObj) => {
        return <ProductListing key={productListingObj.id} productListing={productListingObj}></ProductListing>
      })
    }
    </div>
  );
}

function mapStateToProps(state) {
  return {
    productListings: state.productListings,
    searchTerm: state.searchTerm
  }
}

export default connect(mapStateToProps)(ProductListingsCollection);
