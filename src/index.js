import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "semantic-ui-css/semantic.min.css";
import App from "./App";
import {createStore} from "redux";
import {Provider} from "react-redux";
import reducer from "./reducers/index.js";
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route render={ props => <App {...props} />} />
    </Router>
  </Provider>,
  document.getElementById("root")
);
