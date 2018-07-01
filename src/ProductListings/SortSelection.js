import React, { Component } from "react";
import { Select } from "semantic-ui-react";

const SortSelection = (props) => {
  return (
    <select onChange={(event) => props.sortProductListings(event.target.value)}>
      <option value="Relevance">Relevance</option>
      <option value="Recent">Recent</option>
      <option value="Price: Low to High">Price: Low to High</option>
      <option value="Price: High to Low">Price: High to Low</option>
      <option value="Featured">Featured</option>
    </select>
  );
}

export default SortSelection;
