import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className="navbar">
      <NavLink
        to="/product-listings"
        exact
        style={{
          color: "blue",
          padding: "20px"
        }}
        activeStyle={{
          color: "red"
        }}
      >
        Home
      </NavLink>

      <NavLink
        to="/new-product-listing"
        exact
        style={{
          color: "blue",
          padding: "20px"
        }}
        activeStyle={{
          color: "red"
        }}
      >
        Create a Product Listing
      </NavLink>
    </div>
  );
};

export default NavBar;
