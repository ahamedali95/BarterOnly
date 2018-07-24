import React, { Component } from "react";
import adapter from "../adapter.js";
import { connect } from "react-redux";
import ProductListingDetails from "../ProductListings/ProductListingDetails.js";
import { updateProductListings, removeCurrentProductListing, selectProductListing } from "../actions/index.js";
import { Table, Icon } from "semantic-ui-react";
import { BrowserRouter, Route } from "react-router-dom";

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

    adapter.get("product_listings")
    .then(response => response.json())
    .then(data => this.props.updateProductListings(data));
  }

  componentWillUnmount() {
    this.props.updateProductListings([]);
  }

  itemsUserisLookingFor = () => {
    //Filter products listings belonging to a user and get the items they are looking for
    const p = this.props.productListings.filter((productListingObj) => {
      return productListingObj.user_id === Number(adapter.getUserId()) && !productListingObj.isSold
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
      return productListingObj.user_id !== Number(adapter.getUserId()) && !productListingObj.isSold;
    });

    const newProductListings = [];

    for(let i = 0; i < productListings.length; i++) {
        const productListing = productListings[i];
      for(let j = 0; j < items.length; j++) {
        //productListing.name.toLowerCase().includes(items[j].toLowerCase())
        if(this.call(productListing.name, items[j])) {
          newProductListings.push(productListing);
        }
      }
    }

    return newProductListings;
  }

  call = (item1, item2) => {
    const item1Words = item1.split(" ");
    const item2Words = item2.split(" ");

    for(let i = 0; i < item1Words.length; i++) {
      const word1 = item1Words[i];
      for(let j = 0; j < item2Words.length; j++) {
        if(word1.toLowerCase().includes(item2Words[j].toLowerCase())) {
          return true;
        }
      }
    }

    return false
  }

  productListingsRow = () => {
    const productListings = this.matchingProductListings(this.itemsUserisLookingFor());
    //debugger
    const rows = productListings.map((productListingObj) => {
      return (
        <Table.Row key={productListingObj.id}>
          <Table.Cell>
            <img className="private-image" src={productListingObj.image}/>
            <p><a onClick={() => this.props.selectProductListing(productListingObj)}>{productListingObj.name}</a></p>
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
          <Table className="listings-table">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell className="product-listings-table-header">Content</Table.HeaderCell>
                <Table.HeaderCell className="product-listings-table-header">Value</Table.HeaderCell>
                <Table.HeaderCell className="product-listings-table-header">Exchange Item</Table.HeaderCell>
                <Table.HeaderCell className="product-listings-table-header">Date Posted</Table.HeaderCell>
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
    productListings: state.productListings,
    currentProductListing: state.currentProductListing
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateProductListings: (newProductListings) => {
      dispatch(updateProductListings(newProductListings));
    },
    selectProductListing: (productListing) => {
      dispatch(selectProductListing(productListing));
    },
    removeCurrentProductListing: () => {
      dispatch(removeCurrentProductListing())
    }
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(MatchingProductListings);
