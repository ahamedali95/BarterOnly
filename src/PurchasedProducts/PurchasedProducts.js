import React, { Component } from "react";
import { Table } from "semantic-ui-react";
import { connect } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import Moment from "react-moment";
import { setPurchases, selectProductListing, removeCurrentProductListing } from "../actions/index.js";
import adapter from "../adapter.js";
import ProductListingDetails from "../ProductListings/ProductListingDetails.js";

class PurchasedProducts extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.removeCurrentProductListing();

    adapter.get(`users/${adapter.getUserId()}/purchases`)
    .then(response => response.json())
    .then((data) => this.props.setPurchases(data));
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
        {
          this.props.currentProductListing === null ?
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
            :
            <BrowserRouter>
              <Route
                render={ props => <ProductListingDetails {...props} />}
              />
            </BrowserRouter>
          }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    purchases: state.purchases,
    currentProductListing: state.currentProductListing
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setPurchases: (purchases) => {
      dispatch(setPurchases(purchases));
    },
    selectProductListing: (productListing) => {
      dispatch(selectProductListing(productListing))
    },
    removeCurrentProductListing: () => {
      dispatch(removeCurrentProductListing())
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PurchasedProducts);
