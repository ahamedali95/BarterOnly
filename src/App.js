import React, { Component } from "react";
import "./App.css";
import adapter from "./adapter.js";
import UserRegisterForm from "./Register/UserRegisterForm.js";
import LoginForm from "./Login/LoginForm.js";
import ProductListingContainer from "./ProductListings/ProductListingContainer.js";
import ProductListingForm from "./NewListing/ProductListingForm.js";
import PrivateProductListings from "./PrivateListings/PrivateProductListings.js";
import MatchingProductListings from "./Matches/MatchingProductListings.js";
import NavBar from "./NavBar.js";
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

class App extends Component {

  constructor() {
    super();

    this.state = {
      isNavigationChanged: false
    }
  }

  handleClick = () => {
    localStorage.clear();
    this.forceUpdate();
    this.setState({
      isNavigationChanged: true
    });
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <NavBar className="navbar" handleClick={this.handleClick}/>
            {
              !adapter.getToken() ?
                <React.Fragment>
                  <Route exact path="/register" render={(props) => <UserRegisterForm {...props}/>}></Route>
                  <Route exact path="/login" render={(props) => <LoginForm {...props}/>}></Route>
                </React.Fragment>
                :
                <Redirect exact path="/product-listings"/>
            }
            <Route exact path="/product-listings" component={ProductListingContainer}></Route>
            <Route exact path="/new-product-listing" component={ProductListingForm}></Route>
            <Route exact path="/my-product-listings" component={PrivateProductListings}></Route>
            <Route exact path="/matching-listings" component={MatchingProductListings}></Route>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
