import React, { Component } from 'react';
import './App.css';
import ProductListingContainer from "./ProductListings/ProductListingContainer.js";

class App extends Component {
  render() {
    return (
      <div className="App">
        <ProductListingContainer/>
      </div>
    );
  }
}

export default App;
