import React, { Component } from "react";
import { selectProductListing} from "../actions/index.js";
import { Card, Image, Button } from "semantic-ui-react";
import { connect } from "react-redux";

const ProductListing = (props) => {
  console.log("INSIDE PRODUCTLISTING", props);
  return (
    <Card>
      <Card.Content>
        <Image src={props.productListing.image}/>
        <Card.Header>{props.productListing.name}</Card.Header>
        <Card.Meta>{`$${props.productListing.value}`}</Card.Meta>
        <Card.Description>{props.productListing.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div>
          <Button basic color="green" onClick={() => props.selectProductListing(props.productListing)}>
            View Listing
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectProductListing: (productListing) => {
      dispatch(selectProductListing(productListing));
    }
  };
}

export default connect(null, mapDispatchToProps)(ProductListing);
