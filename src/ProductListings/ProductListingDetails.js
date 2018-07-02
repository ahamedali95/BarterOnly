import React, { Component } from "react";
import adapter from "../adapter.js";
import { Form, Input, Button } from "semantic-ui-react";
import { Rating } from "semantic-ui-react";
import { connect } from "react-redux";

class ProductListingDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rating: props.productListing.rating,
      purchaseOption: null
    }
  }

  // handleRating = (event, { name, rating }) => {
  //   this.setState({
  //     [name]: rating
  //   }, () => console.log(this.state));
  // }

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
    //the product listings that are not sold.
    const bodyForPurchase = {
      name: this.props.productListing.name,
      description: this.props.productListing.description,
      image: this.props.productListing.image,
      value: this.props.productListing.value,
      condition: this.props.productListing.condition,
      location: this.props.productListing.location,
      delivery_method: this.props.productListing.deliveryMethod,
      mode_of_purchase: this.state.purchaseOption,
      rating: this.props.productListing.rating,
      category_id: this.props.productListing.category_id,
      user_id: this.props.userId,
      seller_id: this.props.productListing.user_id
    };

    const bodyForProductListing = {
      isSold: true
    };

    Promise.all([
      adapter.post("purchases", bodyForPurchase),
      adapter.patch(`product_listings/${this.props.productListing.id}`,bodyForProductListing)
    ])
    .then(([response1, response2]) => Promise.all([response1.json(), response2.json()]))
    .then(([data1, data2]) => console.log(data1, data2))

    // .then(response => response.json())
    // .then(data => {debugger})

  }

  purchaseOptions = () => {
    //Checking whether the user is looking for cash or an exchange item
    //If they wanted cash,
      //then select option will only include cash
    //Otherwise, all options are included: cash, exchange_item and offer
    if(this.props.productListing.exchange_item === null) {
      return [{key: "cash", value: "Cash", text: "Cash"}];
    } else {
      return [
        {key: "cash", value: "Cash", text: "Cash"},
        {key: "exchangeItem", value: "Exchange Item", text: "I have the exchange item"},
        {key: "offer", value: "Offer", text: "I neither want to pay with cash or exchange any item. Make an offer instead"}
      ];
    }
  }


  //Here, we need to conditional rendering based on the selected option
  //If the user selects the cash option or exchange option
    //then we show the checkout button
  //If the user selects the offer option
    //then we show the offer button
  render() {
    return (
      <div>
        <h1>{this.props.productListing.name}</h1>
        {/*<Rating icon='star' defaultRating={this.state.rating} maxRating={5} name="rating" onRate={(event, { name, rating }) => this.handleRating(event, { name, rating })}/>*/}
        <img src={this.props.productListing.image}/>
        <h2>Description</h2>
        <p>{this.props.productListing.description}</p>
        <p>Location: {this.props.productListing.location}</p>
        <p>Delivery: {this.props.productListing.delivery_method}</p>
        <p>Condition: {this.props.productListing.condition}</p>
        <p>Value: {this.props.productListing.value}</p>
        <h2>Wanted</h2>
        {
          this.props.productListing.exchange_item === null ?
            "Cash"
            :
            this.props.productListing.exchange_item
        }
        <Form.Select
          required
          label="Purchase Options:"
          name="purchaseOption"
          placeholder="Purchase Options"
          options={this.purchaseOptions()}
          value={this.state.purchaseOption}
          onChange={(event, { name, value }) => this.handleChange(event, { name, value })}
        />
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
    userId: state.userId
  };
}

export default connect(mapStateToProps)(ProductListingDetails);
