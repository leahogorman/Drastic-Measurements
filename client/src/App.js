import React from "react";
import { Router, Switch, Route } from "react-router-dom";

import { createBrowserHistory } from "history";

// Styles
import "assets/scss/material-kit-react.scss";

// Firebase for login function
import withFirebaseAuth from "react-with-firebase-auth";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebaseConfig";

import AuthContext, { AuthProvider } from "views/AuthProvider/authprovider.js";

// View Pages
import Dashboard from "views/Dashboard/Dashboard.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import AddActor from "views/AddActor/AddActor.js";
import SearchPage from "views/SearchPage/SearchPage.js";
import RegistrationPage from "./views/RegistrationPage/RegistrationPage.js";

const hist = createBrowserHistory();
const firebaseApp = firebase.initializeApp(firebaseConfig);

const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

function App(props) {
  const {
    user,
    signOut,
    signInWithGoogle,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
  } = props;

  const auth = {
    user,
    accessToken: user ? user.toJSON().stsTokenManager.accessToken : null,
    methods: {
      signOut,
      signInWithGoogle,
      signInWithEmailAndPassword,
      createUserWithEmailAndPassword,
    },
  };

  console.log(auth);

  return (
    <AuthProvider value={auth}>
      <Router history={hist}> 
        <Switch>
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/login-page" component={LoginPage} />
          <Route exact path="/add-actor" component={AddActor} />
          <Route exact path="/search-page" component={SearchPage} />
          <Route exact path="/" component={RegistrationPage} />
        </Switch>
       </Router>       
    </AuthProvider>
  );
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);
