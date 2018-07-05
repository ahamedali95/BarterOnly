import React, { Component } from "react";
import "./App.css";
import UserRegisterForm from "./Register/UserRegisterForm.js";
import ProductListingContainer from "./ProductListings/ProductListingContainer.js";
import ProductListingForm from "./NewListing/ProductListingForm.js";
import PrivateProductListings from "./PrivateListings/PrivateProductListings.js";
import MatchingProductListings from "./Matches/MatchingProductListings.js";
import NavBar from "./NavBar.js";
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <NavBar className="navbar"/>
            <Route exact path="/register" component={UserRegisterForm}></Route>
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
