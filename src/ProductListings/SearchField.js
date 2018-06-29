import React, { Component } from "react";
import { Search } from "semantic-ui-react";

const SearchField = (props) => {
  console.log("INSIDE SEARCH FIELD", props);
  //onChange synthetic event is called onSearchChange in semantic.
  return (
    <Search onSearchChange={(event) => {props.filterProductListings(event.target.value)}}/>
  );
}

export default SearchField;
