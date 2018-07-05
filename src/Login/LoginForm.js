import React, { Component } from "react";
import adapter from "../adapter.js";
import { Form, Input, Button } from "semantic-ui-react";

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const bodyForLogin = {
      ...this.state
    };

    adapter.post("/sessions", bodyForLogin)
    .then(response => response.json())
    .then(data => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      this.props.history.push("/product-listings");
    });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    }, () => console.log(this.state));
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
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
        <Button>Login</Button>
      </Form>
    );
  }
}

export default LoginForm;