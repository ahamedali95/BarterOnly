import React, { Component } from "react";
import {connect} from "react-redux";

const ProductListings = (props) => {
  console.log("INSIDE PRODUCT LISITINGS", props)
  return (
    <p>hello2</p>
  );
}

function mapStateToProps(state) {
  return {
    productListings: state.productListings
  }
}

export default connect(mapStateToProps)(ProductListings);
