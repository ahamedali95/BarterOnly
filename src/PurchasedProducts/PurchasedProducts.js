import React, { Component } from "react";
import { connect } from "react-redux";

class PurchasedProducts extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    debugger
    return (
      <p></p>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    purchases: state.purchases
  };
}

export default connect(mapStateToProps)(PurchasedProducts);
