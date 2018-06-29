import React, { Component } from 'react';
import Categories from "./Categories.js";
import ProductListings from "./ProductListings.js";
import adapter from "../adapter.js";
import {connect} from "react-redux";
import setCategories from "../actions/index.js";

class ProductListingContainer extends Component {
  componentDidMount() {
    adapter.get("categories")
      .then(response => response.json())
      .then(data => this.props.setCategories(data));
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
    categories: state.categories
  }
}

function mapDispatchToProps(dispatch) {
  return {
    setCategories: (categories) => {
      dispatch(setCategories(categories));
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductListingContainer);
