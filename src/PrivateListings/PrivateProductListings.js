import React, { Component } from "react";
import { Table, Icon } from "semantic-ui-react";
import adapter from "../adapter.js";
import { updateProductListings } from "../actions/index.js";
import { connect } from "react-redux";

//This component is a presentation component for the purpose of listing
//an user's own product listings. It is PRIVATE!
const PrivateProductListings = (props) => {
  //Filter the product listings for a particular user.
  console.log("INSIDE PRIVATE ProductListings", props)
  const rows = props.productListings.filter((productListingObj) => {
    return productListingObj.user_id === props.userId
  }).map((productListingObj) => {
    return (
      <Table.Row>
        <Table.Cell>
          <img src={productListingObj.image}/>
          <p>{productListingObj.name}</p>
          <p>{productListingObj.description}</p>
        </Table.Cell>
        <Table.Cell>${productListingObj.value}</Table.Cell>
        <Table.Cell>{
          productListingObj.exchange_item === null ?
            "Cash"
            :
            productListingObj.exchange_item
          }
        </Table.Cell>
        <Table.Cell>{
          productListingObj.isSold ?
            <img src="../assets/images/sold-out-png-19.png"/>
            :
            null
          }
        </Table.Cell>
        <Table.Cell>{productListingObj.created_at}</Table.Cell>
        <Table.Cell>
          <Icon
            name="delete"
            onClick={
              (() => {
                //Upon clicking the delete icon, we will make a DELETE request
                //to delete a particular product listing from the backend and then
                //update the product listings in the global state, thus causing
                //a rerender of PrivateProductListings
                adapter.delete(`product_listings/${productListingObj.id}`)
                // .then(response => response.json())
                // .then(data => console.log(data));
                .then(() => {
                  const newProductListings = props.productListings.filter((plObj) => {
                    return plObj.id !== productListingObj.id && plObj.user_id === props.userId;
                  });

                  props.updateProductListings(newProductListings);
                });
              })
            }
        />
        </Table.Cell>
      </Table.Row>
    );
  });


  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Content</Table.HeaderCell>
          <Table.HeaderCell>Value</Table.HeaderCell>
          <Table.HeaderCell>Exchange Item</Table.HeaderCell>
          <Table.HeaderCell>Date</Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
          <Table.HeaderCell>Del</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {rows}
      </Table.Body>
    </Table>
  );
}

const mapStateToProps = (state) => {
  return {
    userId: state.userId,
    productListings: state.productListings
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateProductListings: (newProductListings) => {
      dispatch(updateProductListings(newProductListings));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivateProductListings);
