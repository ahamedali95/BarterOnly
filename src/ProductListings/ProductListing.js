import React, { Component } from "react";
import { Card } from "semantic-ui-react";

const ProductListing = (props) => {
  console.log("INSIDE PRODUCTLISTING", props);
  return (
    <Card
      image={props.productListing.image}
      header={props.productListing.name}
      meta={`$${props.productListing.value}`}
      description={props.productListing.description}
    />
  );
}

export default ProductListing;
