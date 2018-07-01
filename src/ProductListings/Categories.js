import React, { Component } from "react";
import { setCategoryAndResetSearchTermAndSortOption } from "../actions/index.js";
import { connect } from "react-redux";
import { List } from "semantic-ui-react";

const Categories = (props) => {
  console.log("inside categories", props)
  return (
    <List link>
      <List.Item as="a" onClick={(event) => props.setCategoryAndResetSearchTermAndSortOption("All")}>All</List.Item>
      {
        props.categories.map((categoryObj) => {
          return (
            <List.Item
              as="a"
              key={categoryObj.id}
              onClick={(event) => {
                //Convert the name of the category to id so that when rerender
                //happens we can find the product listings based on this id
                //REMEMBER - product listing belongs to a category so it must have
                //category_id
                const categoryId = props.categories.find((categoryObj) => {
                  return categoryObj.name === event.target.innerText;
                }).id

                props.setCategoryAndResetSearchTermAndSortOption(categoryId);
              }}
            >
              {categoryObj.name}
            </List.Item>
          );
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

function mapDispatchToProps(dispatch) {
  return {
    setCategoryAndResetSearchTermAndSortOption: (categoryId) => {
      dispatch(setCategoryAndResetSearchTermAndSortOption(categoryId));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
