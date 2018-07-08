import React, { Component } from "react";
import { updateSearchTerm } from "../actions/index.js";
import { connect } from "react-redux";
import { Search } from "semantic-ui-react";

const SearchField = (props) => {
  console.log("INSIDE SEARCH FIELD", props);
  //Conditional rendering to decide whether to show the select dropdown menu
  //or not.
  //Select menu will render only if there is a currentProductListing - meaning that
  //a product is selected by the user to view its details

  //onChange synthetic event is called onSearchChange in semantic.
  return (
    <div>
      <Search
        id="search"
        value={props.searchTerm}
        onSearchChange={(event) => {
          props.updateSearchTerm(event.target.value)
        }}
      />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    searchTerm: state.searchTerm
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateSearchTerm: (searchTerm) => {
      dispatch(updateSearchTerm(searchTerm));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchField);
