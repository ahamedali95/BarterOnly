import React, { Component } from 'react';
import './App.css';
import ProductListingContainer from "./ProductListings/ProductListingContainer.js";
import ProductListingForm from "./NewListing/ProductListingForm.js";
import NavBar from "./NavBar.js";
import { BrowserRouter as Router, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <NavBar className="navbar"/>
            <Route exact path="/product-listings" component={ProductListingContainer}></Route>
            <Route exact path="/new-product-listing" component={ProductListingForm}></Route>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
