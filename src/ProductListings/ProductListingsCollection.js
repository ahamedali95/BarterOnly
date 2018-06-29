import React, { Component } from "react";
import ProductListing from "./ProductListing.js";
import { connect } from "react-redux";

const ProductListingsCollection = (props) => {
  console.log("INSIDE PRODUCTLISITINGS COLLECTION", props)
  return (
    <div>
    {
      props.productListings.map((productListingObj) => {
        return <ProductListing key={productListingObj.id} productListing={productListingObj}></ProductListing>
      })
    }
    </div>
  );
}

function mapStateToProps(state) {
  return {
    productListings: state.productListings
  }
}

export default connect(mapStateToProps)(ProductListingsCollection);
