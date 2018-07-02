import React, { Component } from 'react';
import { Form, Input, Button } from "semantic-ui-react";
import adapter from "../adapter.js";
import { connect } from "react-redux";

class ProductListingForm extends Component {
  constructor() {
    super();

    this.state = {
      name: "",
      description: "",
      image: "",
      value: "",
      condition: null,
      location: null,
      deliveryMethod: null,
      category: null,
      option: "cash",
      exchangeItem: ""
    };
  }

  handleSubmit = (event) => {
    //Decide if the the seller is looking for any exchange item,
    //if the option is cash,
        //then exchange item should be set to null
    //Otherwise, it should be set to the value of the exchange item
    let exchange_item = null;
    if(this.state.option === "cash") {
      exchange_item = null;
    } else {
      exchange_item = this.state.exchangeItem
    }

    const body = {
      name: this.state.name,
      description: this.state.description,
      image: this.state.image,
      value: this.state.value,
      condition: this.state.condition,
      location: this.state.location,
      delivery_method: this.state.deliveryMethod,
      exchange_item: exchange_item,
      rating: 0,
      category_id: this.state.category,
      user_id: 1
    };

    adapter.post("product_listings", body)
    // .then(response => response.json())
    // .then(data => {debugger})
    .then(() => this.resetForm());
  }

  resetForm = () => {
    this.setState({
      name: "",
      description: "",
      image: "",
      value: "",
      condition: null,
      location: null,
      deliveryMethod: null,
      category: null,
      option: "cash",
      exchangeItem: ""
    });
  }

  handleChange = (event, {name, value}) => {
    if (event.target.value === undefined) {
      this.setState({
        [name]: value
      }, () => console.log(this.state));
    } else {
      this.setState({
        [event.target.name]: event.target.value
      }, () => console.log(this.state));
    }
  }

  //These are options for the Form.Select which is a Semantic UI react component.
  //It requires to have an array of objects.
  locationOptions = () => {
    const locations = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine',
    'Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina',
    'South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];

    return locations.map((location) => {
      return {key: location, value: location, text: location};
    });
  }

  conditionOptions = () => {
    return [
      {key: "brand new", value: "Brand New", text: "Brand New"},
      {key: "like new", value: "Like New", text: "Like New"},
      {key: "good", value: "Good", text: "Good"},
      {key: "old", value: "Old", text: "Old"}
    ];
  }

  deliveryOptions = () => {
    return [
      {key: "shipping", value: "Shipping", text: "Shipping"},
      {key: "local pick-up", value: "Local Pick-up", text: "Local Pick-up"}
    ];
  }

  categoryOptions = () => {
    return this.props.categories.map((categoryObj) => {
      return {key: categoryObj.name, value: categoryObj.name, text: categoryObj.name};
    });
  }

  render() {
    return (
      <div>
        <h1>Product Listing</h1>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field
            required
            label="Name"
            type="text"
            name="name"
            control={Input}
            placeholder="Product Name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <Form.Field
            required
            label="Description"
            type="text"
            name="description"
            control={Input}
            placeholder="Product details"
            value={this.state.description}
            onChange={this.handleChange}
          />
          <Form.Field
            required
            label="Image URI"
            type="text"
            name="image"
            control={Input}
            placeholder="Image URI"
            value={this.state.image}
            onChange={this.handleChange}
          />
          <Form.Field
            required
            label="Value"
            type="number"
            name="value"
            control={Input}
            placeholder="Value"
            min="1"
            step="0.01"
            pattern="\d+\.\d+\.\d+"
            value={this.state.value}
            onChange={this.handleChange}
          />
          <Form.Select
            required
            label="Condition"
            name="condition"
            placeholder="Condition"
            options={this.conditionOptions()}
            value={this.state.condition}
            onChange={(event, { name, value }) => this.handleChange(event, { name, value })}
          />
          <Form.Select
            required
            label="Location"
            name="location"
            placeholder="Location"
            options={this.locationOptions()}
            value={this.state.location}
            onChange={(event, { name, value }) => this.handleChange(event, { name, value })}
          />
          <Form.Select
            required
            label="Delivery"
            name="deliveryMethod"
            placeholder="Delivery"
            options={this.deliveryOptions()}
            value={this.state.deliveryMethod}
            onChange={(event, { name, value }) => this.handleChange(event, { name, value })}
          />
          <Form.Select
            required
            label="Category"
            name="category"
            placeholder="Category"
            options={this.categoryOptions()}
            value={this.state.category}
            onChange={(event, { name, value }) => {
              //get the id of the category so that we can send a POST request
              //to store the product listing. REMEMBER - product listing belongs
              //to a category
              value = this.props.categories.find((categoryObj) => {
                return categoryObj.name === value;
              }).id;

              this.handleChange(event, { name, value });
            }}
          />
          <Form.Field
            label="Cash/Trade"
          />
          <Form.Checkbox
            radio
            label="Cash"
            name="option"
            value="cash"
            checked={this.state.option === "cash"}
            onChange={(event, { name, value }) => this.handleChange(event, { name, value })}
          />
          <Form.Checkbox
            radio
            label="Exchange Item"
            name="option"
            value="exchange item"
            checked={this.state.option === "exchange item"}
            onChange={(event, { name, value }) => this.handleChange(event, { name, value })}
          />
          {
            this.state.option === "exchange item"  ?
              <Form.Field
                required
                label="Describe the item you are looking for"
                type="text"
                name="exchangeItem"
                control={Input}
                value={this.state.exchangeItem}
                onChange={this.handleChange}
              />
              :
              null
          }
          <Button>Create Listing</Button>
        </Form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories
  };
}

export default connect(mapStateToProps)(ProductListingForm);