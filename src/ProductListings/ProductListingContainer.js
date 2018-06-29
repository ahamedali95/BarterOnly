import React, { Component } from 'react';
import Categories from "./Categories.js";
import ProductListings from "./ProductListings.js";
import adapter from "../adapter.js";
import {connect} from "react-redux";

class ProductListingContainer extends Component {
  componentDidMount() {
    adapter.get("categories")
      .then(response => response.json())
      .then(data => console.log(data));
  }

  render() {
    console.log("hello", this.props)
    return (
      <div>
        <Categories/>
        <ProductListings/>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    items: state.items
  }
}

export default connect(mapStateToProps)(ProductListingContainer);
