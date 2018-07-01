import React, { Component } from "react";
import { updateSortByOption } from "../actions/index.js";
import { connect } from "react-redux";
import { Select } from "semantic-ui-react";

const SortSelection = (props) => {
  return (
    <select value={props.sortByOption} onChange={(event) => {
      props.updateSortByOption(event.target.value);
    }}
    >
      <option value="Relevance">Relevance</option>
      <option value="Recent">Recent</option>
      <option value="Price: Low to High">Price: Low to High</option>
      <option value="Price: High to Low">Price: High to Low</option>
      <option value="Featured">Featured</option>
    </select>
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
