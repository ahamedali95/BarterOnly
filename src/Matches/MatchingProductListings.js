import React, { Component } from "react";
import { connect } from "react-redux";
import ProductListingDetails from "../ProductListings/ProductListingDetails.js";
import { removeCurrentProductListing, selectProductListing } from "../actions/index.js";
import { Table, Icon } from "semantic-ui-react";

class MatchingProductListings extends Component {
  constructor(props) {
    super(props);
  }

  //This is very important because if the user decided to switch to this page
  //after viewing the product details for a particular product and then switch it
  //back to the all product listings page, then we want to show all the
  //products, not the previous product details. We need to this on all pages, except
  //all product listings page

  componentDidMount() {
    this.props.removeCurrentProductListing();
  }

  itemsUserisLookingFor = () => {
    //Filter products listings belonging to a user and get the items they are looking for
    const p = this.props.productListings.filter((productListingObj) => {
      return productListingObj.user_id === Number(localStorage.getItem("userId")) && !productListingObj.isSold
    }).map((productListingObj) => {
      return productListingObj.exchange_item;
    }).filter((exchangeItem) => {
      return exchangeItem !== null;
    })

    //Remove duplicates
    const itemsUserisLookingFor = [];

    p.forEach((exchangeItem) => {
      if(itemsUserisLookingFor.indexOf(exchangeItem) === -1) {
        itemsUserisLookingFor.push(exchangeItem);
      }
    });

    return itemsUserisLookingFor;
  }

  matchingProductListings = (items) => {
    //Filter all product listings that does not belong to the user and not sold out
    //since we are trying to match the products the user is looking to buy or exchange

    const productListings = this.props.productListings.filter((productListingObj) => {
      return productListingObj.user_id !== Number(localStorage.getItem("userId")) && !productListingObj.isSold;
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
    //debugger
    const rows = productListings.map((productListingObj) => {
      return (
        <Table.Row>
          <Table.Cell>
            <img src={productListingObj.image}/>
            <p><a onClick={() => this.props.selectProductListing(productListingObj)}>{productListingObj.name}</a></p>
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
      <div>
      {
        this.props.currentProductListing === null ?
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
          :
          <ProductListingDetails></ProductListingDetails>
      }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    productListings: state.productListings,
    userId: state.userId,
    currentProductListing: state.currentProductListing
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectProductListing: (productListing) => {
      dispatch(selectProductListing(productListing));
    },
    removeCurrentProductListing: () => {
      dispatch(removeCurrentProductListing())
    }
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(MatchingProductListings);
