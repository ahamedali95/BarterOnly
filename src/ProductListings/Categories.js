import React, { Component } from 'react';
import {connect} from "react-redux";

const Categories = (props) => {
  console.log("inside categories", props)
  return (
    <ul>
      {
        props.categories.map((categoryObj) => {
          return <li><a>{categoryObj.name}</a></li>
        })
      }
    </ul>
  );
}

function mapStateToProps(state) {
  return {
    categories: state.categories
  }
}

export default connect(mapStateToProps)(Categories);
