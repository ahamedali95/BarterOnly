import React, { Component } from "react";
import ProductListing from "./ProductListing.js";
import { connect } from "react-redux";

const ProductListingsCollection = (props) => {
  //console.log("INSIDE ProductListingsCollection", props)
  //Filter product listings based on the searchTerm so that we can prepare it
  //for sorting
  const filterProductListings = props.productListings.filter((productListingObj) => {
    return productListingObj.name.toLowerCase().includes(props.searchTerm.toLowerCase());
  });

  //Sort the filterProductListings by switching on several different options and
  //this will rendered in the return statement
  let p = null;

  switch(props.sortByOption) {
    case "Relevance":
    console.log("hello relevance")
      p = filterProductListings
      break;
    case "Recent":
      p = filterProductListings.sort((productListingObj1, productListingObj2) => {
        return new Date(productListingObj2["date_posted"]) - new Date(productListingObj1["date_posted"]);
      });
      console.log("p is", p)
      break;
    case "Price: Low to High":
      p = filterProductListings.sort((productListingObj1, productListingObj2) => {
        return Number(productListingObj1.value) - Number(productListingObj2.value);
      });
      break;
    case "Price: High to Low":
      p = filterProductListings.sort((productListingObj1, productListingObj2) => {
        return Number(productListingObj2.value) - Number(productListingObj1.value);
      });
      break;
    case "Featured":
      p = filterProductListings.sort((productListingObj1, productListingObj2) => {
        return Number(productListingObj2.rating) - Number(productListingObj1.rating);
      });
    default:
      p = filterProductListings;
      break;
  }

  return (
    <div>
    {
      p.map((productListingObj) => {
        return <ProductListing key={productListingObj.id} productListing={productListingObj}></ProductListing>
      })
    }
    </div>
  );
}

function mapStateToProps(state) {
  return {
    productListings: state.productListings,
    searchTerm: state.searchTerm,
    sortByOption: state.sortByOption
  }
}

export default connect(mapStateToProps)(ProductListingsCollection);
