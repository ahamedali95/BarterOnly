import React, { Component } from "react";
import adapter from "../adapter.js";
import { Form, Input, Button } from "semantic-ui-react";
import { Rating } from "semantic-ui-react";
import { connect } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { removeCurrentProductListing, updateProductListings } from "../actions/index.js";

class ProductListingDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rating: this.props.currentProductListing.rating,
      purchaseOption: null
    }
  }

  // handleRating = (event, { name, rating }) => {
  //   this.setState({
  //     [name]: rating
  //   }, () => console.log(this.state));
  // }

  //a fetch GET request happens in this method because once the user purchased
  //an item from the product listing view details page and goes back to the
  //all product listings page, then we need to update the product listings with
  //new new information since an item is purchased by the user.
  handleRedirect = () => {
    this.props.removeCurrentProductListing()
    //browserHistory.push("/product-listings");

  }

  handleChange = (event, { name, value }) => {
    if(event.target.value === undefined) {
      this.setState({
        [name]: value
      }, () => console.log(this.state.purchaseOption));
    }
  }

  handlePurchase = () => {
    //sending a POST request to the purchase
    //Patch the product listings to mark it as sold so that we can filter
    //the product listings that are not sold in the homepage
    const bodyForPurchase = {
      name: this.props.currentProductListing.name,
      description: this.props.currentProductListing.description,
      image: this.props.currentProductListing.image,
      value: this.props.currentProductListing.value,
      condition: this.props.currentProductListing.condition,
      location: this.props.currentProductListing.location,
      delivery_method: this.props.currentProductListing.deliveryMethod,
      mode_of_purchase: this.state.purchaseOption,
      rating: this.props.currentProductListing.rating,
      category_id: this.props.currentProductListing.category_id,
      user_id: Number(adapter.getUserId()),
      seller_id: this.props.currentProductListing.user_id
    };

    const bodyForProductListing = {
      isSold: true
    };

    Promise.all([
      adapter.patch(`product_listings/${this.props.currentProductListing.id}`,bodyForProductListing),
      adapter.post("purchases", bodyForPurchase)
    ]).then(() => {this.getProducts()});
  }

  //Promise.all somehow prioritize fetch GET request since I need to get new product
  //listings after the product has been pruchased, we need that new list.
  getProducts = () => {
    adapter.get("product_listings")
    .then(response => response.json())
    .then(data => this.props.updateProductListings(data));
  }

  purchaseOptions = () => {
    //Checking whether the user is looking for cash or an exchange item
    //If they wanted cash,
      //then select option will only include cash
    //Otherwise, all options are included: cash, exchange_item and offer
    if(this.props.currentProductListing.exchange_item === null) {
      return [{key: "cash", value: "Cash", text: "Cash"}];
    } else {
      return [
        {key: "cash", value: "Cash", text: "Cash"},
        {key: "exchangeItem", value: "Exchange Item", text: "I have the exchange item"},
        {key: "offer", value: "Offer", text: "I neither want to pay with cash or exchange any item. Make an offer instead"}
      ];
    }
  }

  //Here, we need to conditional rendering since we should not allow a user to
  //purchase their own product.
  //If there exists a token and user id and the user id does not match the product
  //listing user_id,
    //Then show the select option
    //Otherwise do not show it.
  //Also, we need to conditional rendering based on the selected option
  //If the user selects the cash option or exchange option
    //then we show the checkout button
  //If the user selects the offer option
    //then we show the offer button
  render() {
    return (
      <div>
        <Button onClick={this.handleRedirect}>Back to Product Listings</Button>
        <h1>{this.props.currentProductListing.name}</h1>
        {/*<Rating icon='star' defaultRating={this.state.rating} maxRating={5} name="rating" onRate={(event, { name, rating }) => this.handleRating(event, { name, rating })}/>*/}
        <img src={this.props.currentProductListing.image}/>
        <h2>Description</h2>
        <p>{this.props.currentProductListing.description}</p>
        <p>Location: {this.props.currentProductListing.location}</p>
        <p>Delivery: {this.props.currentProductListing.delivery_method}</p>
        <p>Condition: {this.props.currentProductListing.condition}</p>
        <p>Value: {this.props.currentProductListing.value}</p>
        <h2>Wanted</h2>
        {
          this.props.currentProductListing.exchange_item === null ?
            "Cash"
            :
            this.props.currentProductListing.exchange_item
        }
        {
          !!adapter.getToken() && !!adapter.getUserId() && Number(adapter.getUserId()) !== this.props.currentProductListing.user_id ?
            <Form.Select
              required
              label="Purchase Options:"
              name="purchaseOption"
              placeholder="Purchase Options"
              options={this.purchaseOptions()}
              value={this.state.purchaseOption}
              onChange={(event, { name, value }) => this.handleChange(event, { name, value })}
            />
            :
            null
        }
        {
          this.state.purchaseOption === "Cash" || this.state.purchaseOption === "Exchange Item" ?
           <Button onClick={this.handlePurchase}>Purchase</Button>
           :
           null
        }
        {
          this.state.purchaseOption === "Offer" ?
            <div>
              <input/>
              <Button>Make an offer</Button>
            </div>
            :
            null
        }

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userId: state.userId,
    currentProductListing: state.currentProductListing
  };
}

//Once the "back to productListing" button is clicked, make the currentProductListing null so that
//when we go to the match product listings, we will see a table, instead of the
//the product listing details
const mapDispatchToProps = (dispatch) => {
  return {
    removeCurrentProductListing: () => {
      dispatch(removeCurrentProductListing())
    },
    updateProductListings: (productListings) => {
      dispatch(updateProductListings(productListings))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductListingDetails);
