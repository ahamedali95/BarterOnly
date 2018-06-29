import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "semantic-ui-css/semantic.min.css";
import App from "./App";
import {createStore} from "redux";
import {Provider} from "react-redux";
import reducer from "./reducers/index.js";

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
