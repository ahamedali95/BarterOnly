import React, { Component } from "react";
import ProductListing from "./ProductListing.js";
import { connect } from "react-redux";

const ProductListingsCollection = (props) => {
  console.log("INSIDE ProductListingsCollection", props)

  let p = null;

  //The very first time we visit the product listings page, we want to see all the
  //products from all categories
  if(props.categorySelected !== "All") {
    //Filter product listings based on the category
    const productListingsByCategory = props.productListings.filter((productListingObj) => {
      return productListingObj.category_id === props.categorySelected;
    });

    //Filter product listings based on the searchTerm so that we can prepare it
    //for sorting
    const filterProductListings = productListingsByCategory.filter((productListingObj) => {
      return productListingObj.name.toLowerCase().includes(props.searchTerm.toLowerCase());
    });

    //Sort the filterProductListings by switching on several different options and
    //this will get rendered in the return statement
    switch(props.sortByOption) {
      case "Relevance":
      console.log("hello relevance")
        p = filterProductListings
        break;
      case "Recent":
        p = filterProductListings.sort((productListingObj1, productListingObj2) => {
          return new Date(productListingObj2["created_at"]) - new Date(productListingObj1["created_at"]);
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
  } else {
      //p = props.productListings

      //Filter product listings based on the searchTerm so that we can prepare it
      //for sorting
      const filterProductListings = props.productListings.filter((productListingObj) => {
        return productListingObj.name.toLowerCase().includes(props.searchTerm.toLowerCase());
      });

      //Sort the filterProductListings by switching on several different options and
      //this will get rendered in the return statement
      switch(props.sortByOption) {
        case "Relevance":
        console.log("hello relevance")
          p = filterProductListings
          break;
        case "Recent":
          p = filterProductListings.sort((productListingObj1, productListingObj2) => {
            return new Date(productListingObj2["created_at"]) - new Date(productListingObj1["created_at"]);
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
    sortByOption: state.sortByOption,
    categorySelected: state.categorySelected
  }
}

export default connect(mapStateToProps)(ProductListingsCollection);
