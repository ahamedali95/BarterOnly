import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "semantic-ui-react"

class NavBar extends Component {
  constructor() {
    super();

    this.state = {
      menuItem: null
    };
  }

  handleClick = (event, { name }) => {
    this.setState({
      menuItem: name
    });
  }

  render() {
    return (
      <Menu id="menu">
        {
          !localStorage.getItem("token") ?
            <React.Fragment>
              <Menu.Item
                as={NavLink}
                to="/register"
                name="register"
                active={this.state.menuItem === "register"}
                onClick={this.handleClick}
              >
                Register
              </Menu.Item>

              <Menu.Item
                as={NavLink}
                to="/login"
                name="login"
                active={this.state.menuItem === "login"}
                onClick={this.handleClick}
              >
                Login
              </Menu.Item>
            </React.Fragment>
            :
            <React.Fragment>
              <button onClick={this.props.handleClick}>Log out</button>

              <Menu.Item
                as={NavLink}
                to="/new-product-listing"
                name="newProductListing"
                active={this.state.menuItem === "newProductListing"}
                onClick={this.handleClick}
              >
                Create a Product Listing
              </Menu.Item>

              <Menu.Item
                as={NavLink}
                to="/my-product-listings"
                name="myProductListings"
                active={this.state.menuItem === "myProductListings"}
                onClick={this.handleClick}
              >
                Private Listings
              </Menu.Item>

              <Menu.Item
                as={NavLink}
                to="/matching-listings"
                name="matchingProductListings"
                active={this.state.menuItem === "matchingProductListings"}
                onClick={this.handleClick}
              >
                Matching Listings
              </Menu.Item>
            </React.Fragment>
        }

          <Menu.Item
            as={NavLink}
            to="/product-listings"
            name="productListings"
            active={this.state.menuItem === "productListings"}
            onClick={this.handleClick}
          >
            Product Listings
          </Menu.Item>

      </Menu>
    );
  }
}


export default NavBar;
