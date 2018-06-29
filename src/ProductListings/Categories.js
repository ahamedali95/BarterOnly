import React, { Component } from 'react';
import {connect} from "react-redux";

const Categories = (props) => {
  console.log("inside categories", props)
  return (
    <p>hello</p>
  );
}

function mapStateToProps(state) {
  return {
    categories: state.categories
  }
}

export default connect(mapStateToProps)(Categories);
