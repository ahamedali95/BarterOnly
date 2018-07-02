import React, { Component } from "react";

const ProductListingDetails = (props) => {
  return (
    <div>
      <h1>{props.productListing.name}</h1>
      <img src={props.productListing.image}/>
      <h2>Description</h2>
      <p>{props.productListing.description}</p>
      <p>Location: {props.productListing.location}</p>
      <p>Delivery: {props.productListing.delivery_method}</p>
      <p>Condition: {props.productListing.condition}</p>
      <p>Value: {props.productListing.value}</p>
      <h2>Wanted</h2>
      {
        props.productListing.exchange_item === null ?
          "Cash"
          :
          props.productListing.exchange_item
      }
    </div>
  );
}

export default ProductListingDetails;
