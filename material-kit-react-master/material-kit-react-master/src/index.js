import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import "assets/scss/material-kit-react.scss?v=1.9.0";

// pages for this product
import LandingPage from "views/LandingPage/LandingPage.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import RegistrationPage from "./views/RegistrationPage/RegistrationPage.js";
import SearchResults from "./views/SearchResults/SearchResults";
import AddActor from "./views/AddActor/AddActor";

var hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/landing-page" component={LandingPage} />
      <Route path="/login-page" component={LoginPage} />
      <Route path="/search-results" component={SearchResults} />
      <Route path="/add-actor" component={AddActor} />
      <Route path="/" component={RegistrationPage} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
