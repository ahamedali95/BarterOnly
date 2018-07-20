import React, { Component } from "react";
import { updateSortByOption } from "../actions/index.js";
import { connect } from "react-redux";
import { Select } from "semantic-ui-react";

const SortSelection = (props) => {
  //Conditional rendering to decide whether to show the select dropdown menu
  //or not.
  //Select menu will render only if there is a currentProductListing - meaning that
  //a product is selected by the user to view its details
  return (
    <div>
      <select id="sortBy" value={props.sortByOption} onChange={(event) => {
        props.updateSortByOption(event.target.value);
      }}
      >
        <option value="Relevance">Relevance</option>
        <option value="Recent">Recent</option>
        <option value="Price: Low to High">Price: Low to High</option>
        <option value="Price: High to Low">Price: High to Low</option>
      </select>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    sortByOption: state.sortByOption
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateSortByOption: (option) => {
      dispatch(updateSortByOption(option));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SortSelection);
