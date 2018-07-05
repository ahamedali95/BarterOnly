import React, { Component } from "react";
import adapter from "../adapter.js";
import { setUserId } from "../actions/index.js";
import { connect } from "react-redux";
import { Form, Input, Button } from "semantic-ui-react";

class UserRegisterForm extends Component {
  constructor() {
    super();

    this.state = {
      firstName: "",
      lastName: "",
      location: null,
      username: "",
      password: "",
      passwordConfirmation: ""
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const bodyForUser = {
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      location: this.state.location,
      username: this.state.username,
      password: this.state.password,
      password_confirmation: this.state.passwordConfirmation
    }

    adapter.post("users", bodyForUser)
    .then(response => response.json())
    .then(data => {
      //We store the token in the local storage rather than in the global state
      //since page refresh will cause the state to reset. But the local storage
      //will persist the token until it has been removed.
      localStorage.setItem("token", data.token);

      localStorage.setItem("userId", data.userId);
      this.props.setUserId(data.userId);
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

  locationOptions = () => {
    const locations = ['Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine',
    'Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina',
    'South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming'];

    return locations.map((location) => {
      return {key: location, value: location, text: location};
    });
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Field
          required
          label="First Name"
          type="text"
          name="firstName"
          control={Input}
          placeholder="First Name"
          value={this.state.firstName}
          onChange={this.handleChange}
        />
        <Form.Field
          required
          label="Last Name"
          type="text"
          name="lastName"
          control={Input}
          placeholder="Last Name"
          value={this.state.lastName}
          onChange={this.handleChange}
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
        <Form.Field
          required
          label="Username"
          name="username"
          control={Input}
          placeholder="Username"
          value={this.state.username}
          onChange={this.handleChange}
        />
        <Form.Field
          required
          label="Password"
          type="password"
          name="password"
          control={Input}
          placeholder="Password"
          value={this.state.password}
          onChange={this.handleChange}
        />
        <Form.Field
          required
          label="Password Confirmation"
          type="password"
          name="passwordConfirmation"
          control={Input}
          placeholder="Password Confirmation"
          value={this.state.passwordConfirmation}
          onChange={this.handleChange}
        />
        <Button>Sign Up</Button>
      </Form>

    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    setUserId: (userId) => {
      dispatch(setUserId(userId));
    }
  };
}

export default connect(null, mapDispatchToProps)(UserRegisterForm);
