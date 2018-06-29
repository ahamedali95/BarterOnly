import React, { Component } from "react";
import {connect} from "react-redux";
import {List} from "semantic-ui-react";

const Categories = (props) => {
  console.log("inside categories", props)
  return (
    <List link>
      {
        props.categories.map((categoryObj) => {
          return <List.Item as="a"><a>{categoryObj.name}</a></List.Item>
        })
      }
    </List>
  );
}

function mapStateToProps(state) {
  return {
    categories: state.categories
  }
}

export default connect(mapStateToProps)(Categories);
