import React, { Component } from "react";
import { updateSearchTerm } from "../actions/index.js";
import { connect } from "react-redux";
import { Search } from "semantic-ui-react";

const SearchField = (props) => {
  console.log("INSIDE SEARCH FIELD", props);
  //onChange synthetic event is called onSearchChange in semantic.
  return (
    <Search
      value={props.searchTerm}
      onSearchChange={(event) => {
        props.updateSearchTerm(event.target.value)
      }}
    />
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
