import React, { Component } from "react";
import adapter from "../adapter.js";
import { Form, Input, Button } from "semantic-ui-react";
import { Message } from "semantic-ui-react";

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      isError: false,
      errorMessages: []
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const bodyForLogin = {
      username: this.state.username,
      password: this.state.password
    };

    adapter.post("sessions", bodyForLogin)
    .then(response => response.json())
    .then(data => {

      //Here we are verifying the json that is returned back from the server.
      //If there is no token or userId, then we know that credentials did not
      //match so will issue an error. Otherwise, set local storage and push
      //history
      if(!!data.errors) {
        this.setState({
          isError: true,
          errorMessages: [...[], data.errors]
        });
      } else {
        adapter.setToken(data.token);
        adapter.setUserId(data.userId);
        this.props.history.push("/product-listings");
        window.location.reload();
      }
    });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    }, () => console.log(this.state));
  }

  loadErrors = () => {
    return (
      <Message
        className="error-messages"
        error
        header='There was some errors with your submission'
        list={this.state.errorMessages}
      />
    );
  }

  loadForm = () => {
    return (
      <div className="form">
        <h1 className="form-heading">Login</h1>
        <Form onSubmit={this.handleSubmit} id="login-form">
          <Form.Field
            className="form-input"
            required
            label="Username"
            name="username"
            control={Input}
            placeholder="Username"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <Form.Field
            className="form-input"
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
      </div>
    );
  }

  render() {
    return (
      <div>
      {
        this.state.isError ?
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

export default LoginForm;
