import React, { Component } from "react";
import { connect } from "react-redux";
import { Table, Icon } from "semantic-ui-react";

class MatchingProductListings extends Component {
  constructor(props) {
    super(props);
  }

  itemsUserisLookingFor = () => {
    //Filter products listings belonging to a user and get the items they are looking for
    const itemsUserisLookingFor = this.props.productListings.filter((productListingObj) => {
      return productListingObj.user_id === this.props.userId;
    }).map((productListingObj) => {
      return productListingObj.exchange_item;
    }).filter((exchange_item) => {
      return exchange_item !== null;
    });

    return itemsUserisLookingFor;
  }

  matchingProductListings = (items) => {
    //Filter all product listings that does not belong to the user and not sold out
    //since we are trying to match the products the user is looking to buy or exchange

    const productListings = this.props.productListings.filter((productListingObj) => {
      return productListingObj.user_id !== this.props.userId && !productListingObj.isSold;
    });

    const newProductListings = [];

    for(let i = 0; i < productListings.length; i++) {
        const productListing = productListings[i];
      for(let j = 0; j < items.length; j++) {
        if(productListing.name.toLowerCase().includes(items[j].toLowerCase())) {
          newProductListings.push(productListing);
        }
      }
    }

    return newProductListings;
  }

  productListingsRow = () => {
    const productListings = this.matchingProductListings(this.itemsUserisLookingFor());

    const rows = productListings.map((productListingObj) => {
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

          <Table.Cell>{productListingObj.created_at}</Table.Cell>

        </Table.Row>
      );
    });

    return rows;
  }

  render() {
    return (
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Content</Table.HeaderCell>
            <Table.HeaderCell>Value</Table.HeaderCell>
            <Table.HeaderCell>Exchange Item</Table.HeaderCell>
            <Table.HeaderCell>Date</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {this.productListingsRow()}
        </Table.Body>
      </Table>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    productListings: state.productListings,
    userId: state.userId
  };
}

export default connect(mapStateToProps)(MatchingProductListings);
