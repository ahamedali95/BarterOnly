import React, { Component } from "react";
import { removeCurrentProductListing } from "../actions/index.js";
import { Form, Input, Button, Select } from "semantic-ui-react";
import { Message } from "semantic-ui-react";
import adapter from "../adapter.js";
import { connect } from "react-redux";
import Dropzone from "react-dropzone";
import request from "superagent";
import { CLOUDINARY_UPLOAD_PRESET, CLOUDINARY_UPLOAD_URL }  from "../keys.js";


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
      exchangeItem: "",
      isError: false,
      errorMessages: []
    };
  }

  //This is very important because if the user decided to switch to this page
  //after viewing the product details for a particular product and then switch it
  //back to the all product listings page, then we want to show all the
  //products, not the previous product details. We need to this on all pages, except
  //all product listings page

  componentDidMount() {
    this.props.removeCurrentProductListing();
  }

  handleSubmit = (event) => {
    event.preventDefault();

    //get the id of the category so that we can send a POST request
    //to store the product listing. REMEMBER - product listing belongs
    //to a category

    let categoryId = null;
    //Check to see whether user has selected the category. Otherwise, assign
    //the product listing to the cateogry "others". Unfortunately,
    //adding "required" props to Semantic UI react component, does not force the
    //user to select a category.
    if(!this.state.category) {
      categoryId = this.props.categories.find((categoryObj) => {
        return categoryObj.name === "Others";
      }).id;
    } else {
      categoryId = this.props.categories.find((categoryObj) => {
        return categoryObj.name === this.state.category;
      }).id;
    }

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
      category_id: categoryId,
      user_id: Number(adapter.getUserId()),
      isSold: false
    };

    adapter.post("product_listings", body)
    .then(response => response.json())
    .then(data => {
      if(!!data.errors) {
        this.setState({
          isError: true,
          errorMessages: data.errors
        });
      } else {
        this.setState({
          isError: false
        }, () => this.resetForm());
      }
    });
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
    //get the id of the category so that we can send a POST request
    //to store the product listing. REMEMBER - product listing belongs
    //to a category
    if(event.target.value === undefined) {
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

  onImageDrop = (files) => {
    this.setState({
      uploadedFile: files[0]
    }, () => this.handleImageUpload(files[0]));
  }

  //Uploading to the image to the API.
  handleImageUpload = (file) => {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                        .field('file', file);

    upload.end((err, response) => {
      if(err) {
        console.error(err);
      }

      if(response.body.secure_url !== '') {
        this.setState({
          image: response.body.secure_url
        }, () => console.log("INSIDE UPLOAD PIC", this.state));
      }
    });
  }

  loadErrors = () => {
    return (
      <Message
        error
        header='There was some errors with your submission'
        list={this.state.errorMessages}
      />
    );
  }

  loadForm = () => {
    return (
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
        <Dropzone
          multiple={false}
          accept="image/*"
          onDrop={this.onImageDrop}>
          <p>Drop an image or click to select a file to upload.</p>
        </Dropzone>
        {
          this.state.image.length !== 0 ?
            <img src={this.state.image}/>
            :
            null
        }
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
    );
  }

  render() {
    return (
      <div>
        <h1>Product Listing</h1>
        {this.state.isError ?
          <React.Fragment>
            {this.loadErrors()}
            {this.loadForm()}
          </React.Fragment>
          :
          <React.Fragment>
            {this.loadForm()}
          </React.Fragment>
        }
      </div>

    );
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories
  };
}

function mapDispatchToProps(dispatch) {
  return {
    removeCurrentProductListing: () => {
      dispatch(removeCurrentProductListing())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductListingForm);
