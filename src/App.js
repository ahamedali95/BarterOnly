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
import ModifyProductListing from "./ModifyListing/ModifyProductListing.js";
import PurchasedProducts from "./PurchasedProducts/PurchasedProducts.js";
import NavBar from "./NavBar/NavBar.js";
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isNavigationChanged: false
    }
  }

  changeNavigation = () => {
    this.setState({
      isNavigationChanged: !this.isNavigationChanged
    })
  }

  handleClick = () => {
    //After clicking logout, if the user was in the product listing details page,
    //then we must show all product listings. how do we do it aagain?
    //Remove the currentProductListing from the global store.
    localStorage.clear();
    this.props.removeCurrentProductListing()
    this.setState({
      isNavigationChanged: !this.state.isNavigationChanged
    }, () => this.props.history.push("/login"));
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <div className="App">
              <header className="App-header">
                <a href="http://localhost:3000/product-listings"><img id="banner" src="../assets/images/banner.png" alt="banner"/></a>
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
                  <Route exact path="/new-product-listing" component={ProductListingForm}></Route>
                  <Route exact path="/my-product-listings" component={PrivateProductListings}></Route>
                  <Route exact path="/matching-listings" component={MatchingProductListings}></Route>
                  <Route exact path="/my-purchases" component={PurchasedProducts}></Route>
                </React.Fragment>
                :
                <Redirect to={{pathname: "/login"}} push/>
            }
            <Route exact path="/product-listings" render={(props) => <ProductListingContainer {...props}/>}></Route>
            <Route exact path="/edit-product-listing" component={ModifyProductListing}></Route>


            {/*}<Route exact path="/new-product-listing" component={ProductListingForm}></Route>
            <Route exact path="/my-product-listings" component={PrivateProductListings}></Route>
            <Route exact path="/matching-listings" component={MatchingProductListings}></Route>
            */}
            <footer>
              <a href="http://localhost:3000/product-listings"><img id="footer" src="../assets/images/footer.png" alt="footer"/></a>
            </footer>
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
