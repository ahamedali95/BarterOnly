import React, { Component } from "react";
import { Table } from "semantic-ui-react";
import { connect } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import Moment from "react-moment";
import { setPurchases } from "../actions/index.js";
import adapter from "../adapter.js";

class PurchasedProducts extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    adapter.get(`users/${adapter.getUserId}/purchases`)
    .then(response => response.json())
    .then(data => {debugger})
  }

  getUserName = () => {

  }

  productListingsRow = () => {
    const rows = this.props.purchases.map((purchaseObj) => {
      return (
        <Table.Row>
          <Table.Cell>
            <img className="private-image" src={purchaseObj.image}/>
            <p><a onClick={() => this.props.selectProductListing(purchaseObj)}>{purchaseObj.name}</a></p>
            <p className="private-listing-details">{purchaseObj.description}</p>
          </Table.Cell>
          <Table.Cell className="private-listing-details">${purchaseObj.value}</Table.Cell>
          <Table.Cell className="private-listing-details">
            {
              purchaseObj.exchange_item === null ?
                "Cash"
                :
                purchaseObj.exchange_item
            }
          </Table.Cell>

          <Table.Cell><Moment format="DD-MMM-YYYY">{purchaseObj.created_at}</Moment></Table.Cell>

        </Table.Row>
      );
    });

    return rows;
  }

  render() {
    return (
      <div>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell className="product-listings-table-header">Content</Table.HeaderCell>
              <Table.HeaderCell className="product-listings-table-header">Value</Table.HeaderCell>
              <Table.HeaderCell className="product-listings-table-header">Paid With</Table.HeaderCell>
              <Table.HeaderCell className="product-listings-table-header">Date Purchased</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.productListingsRow()}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    purchases: state.purchases
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setPurchases: (purchases) => {
      dispatch(setPurchases(purchases));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PurchasedProducts);
