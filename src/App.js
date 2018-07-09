import React, { Component } from "react";
import "./App.css";
import adapter from "./adapter.js";
import { connect } from "react-redux";
import { removeCurrentProductListing } from "./actions/index.js";
import UserRegisterForm from "./Register/UserRegisterForm.js";
import LoginForm from "./Login/LoginForm.js";
import ProductListingContainer from "./ProductListings/ProductListingContainer.js";
import ProductListingForm from "./NewListing/ProductListingForm.js";
import PrivateProductListings from "./PrivateListings/PrivateProductListings.js";
import MatchingProductListings from "./Matches/MatchingProductListings.js";
import Footer from "./Footer.js"
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
    //After clicking logout, if the user was in the product listing details page,
    //then we must show all product listings. how do we do it aagain?
    //Remove the currentProductListing from the global store.
    localStorage.clear();
    this.props.removeCurrentProductListing()
    this.setState({
      isNavigationChanged: true
    });
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <div className="App">
            <header className="App-header">
              <a href="http://localhost:3000/product-listings"><img id="banner" src="../assets/images/m (2).png" alt="banner"/></a>
            </header>
            </div>
            <NavBar className="navbar" handleClick={this.handleClick}/>
            {
              !localStorage.getItem("token") ?
                <React.Fragment>
                  <Route exact path="/register" render={(props) => <UserRegisterForm {...props}/>}></Route>
                  <Route exact path="/login" render={(props) => <LoginForm {...props}/>}></Route>
                </React.Fragment>
                :
                <Redirect to={{pathname: "/product-listings"}} push/>
            }
            {
              !!localStorage.getItem("token") ?
                <React.Fragment>
                  <Route exact path="/new-product-listing" render={(props) => <ProductListingForm {...props}/>}></Route>
                  <Route exact path="/my-product-listings" render={(props) => <PrivateProductListings {...props}/>}></Route>
                  <Route exact path="/matching-listings" render={(props) => <MatchingProductListings {...props}/>}></Route>
                </React.Fragment>
                :
                <Redirect to={{pathname: "/login"}} push/>
            }
            <Route exact path="/product-listings" component={ProductListingContainer}></Route>

            {/*
              <Route exact path="/new-product-listing" component={ProductListingForm}></Route>
            <Route exact path="/my-product-listings" component={PrivateProductListings}></Route>
            <Route exact path="/matching-listings" component={MatchingProductListings}></Route>
            */}
            <div className="App">
            <header className="App-header">
              <a href="http://localhost:3000/product-listings"><img id="banner" src="../assets/images/m (2).png" alt="banner"/></a>
            </header>
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeCurrentProductListing: () => {
      dispatch(removeCurrentProductListing())
    }
  };
}


export default connect(null, mapDispatchToProps)(App);
