import React, { Component } from "react";
import { Table, Icon } from "semantic-ui-react";
import adapter from "../adapter.js";
import { updateProductListings, removeCurrentProductListing, selectProductListing } from "../actions/index.js";
import { connect } from "react-redux";
import Moment from 'react-moment';
import ProductListingDetails from "../ProductListings/ProductListingDetails.js";
import { BrowserRouter, Route } from "react-router-dom";

//This component was once a presentation component for the purpose of listing
//an user's own product listings. Now, it is a class component since I need to
//use the componentDidMount method to reset the currentProductListing to null
//so that when the user switches from this page to the all productListings page,
//they WILL see all product listings rather than once single product listing details.
class PrivateProductListings extends Component {
  constructor(props) {
    super(props);
  }

  //This is very important because if the user decided to switch to this page
  //after viewing the product details for a particular product and then switch it
  //back to the all product listings age, then we want to show all the
  //products, not the previous product details. We need to this on all pages, except
  //all product listings page
  componentDidMount() {
    this.props.removeCurrentProductListing();
    //VERY IMPORTANT CHANGE HERE SINCE ADDING OAUTH!
    //Currently, once the user logs in, the user id is stored in the local storage
    //and we need to fetch all private listings belonging to that user.
    adapter.get(`users/${adapter.getUserId()}/product_listings`)
    .then(response => response.json())
    .then(data => this.props.updateProductListings(data));
  }

  productListingsRows = () => {
    console.log("INSIDE PRIVATE ProductListings", this.props)
    // const rows = this.props.productListings.filter((productListingObj) => {
    //   return productListingObj.user_id === this.props.userId
    // })
    const rows = this.props.productListings.map((productListingObj) => {
      return (
        <Table.Row>
          <Table.Cell>
            <img className="private-image" src={productListingObj.image}/>
            <a onClick={() => this.props.selectProductListing(productListingObj)}><p className="private-listing-details">{productListingObj.name}</p></a>
            <p className="private-listing-details">{productListingObj.description}</p>
          </Table.Cell>
          <Table.Cell className="private-listing-details">${productListingObj.value}</Table.Cell>
          <Table.Cell className="private-listing-details">
            {
              productListingObj.exchange_item === null ?
                "Cash"
                :
                productListingObj.exchange_item
            }
          </Table.Cell>
          <Table.Cell className="private-listing-details"><Moment format="DD-MMM-YYYY">{productListingObj.created_at}</Moment></Table.Cell>
          <Table.Cell>
            {
              productListingObj.isSold ?
                <img src="../assets/images/sold-out-png-19.png" alt="product image"/>
                :
                null
            }
          </Table.Cell>
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
                    const newProductListings = this.props.productListings.filter((plObj) => {
                      return plObj.id !== productListingObj.id && plObj.user_id === this.props.userId;
                    });

                    this.props.updateProductListings(newProductListings);
                  });
                })
              }
          />
          </Table.Cell>
        </Table.Row>
      );
    });

    return rows;
  }
  //Filter the product listings for a particular user.

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
                <Table.HeaderCell className="product-listings-table-header">Exchange Item</Table.HeaderCell>
                <Table.HeaderCell className="product-listings-table-header">Date Posted</Table.HeaderCell>
                <Table.HeaderCell className="product-listings-table-header"></Table.HeaderCell>
                <Table.HeaderCell className="product-listings-table-header">Del</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {this.productListingsRows()}
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
    userId: state.userId,
    productListings: state.productListings,
    currentProductListing: state.currentProductListing
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateProductListings: (newProductListings) => {
      dispatch(updateProductListings(newProductListings));
    },
    removeCurrentProductListing: () => {
      dispatch(removeCurrentProductListing());
    },
    selectProductListing: (productListing) => {
      dispatch(selectProductListing(productListing))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PrivateProductListings);
