import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// import { createBrowserHistory } from "history";

import "assets/scss/material-kit-react.scss?v=1.9.0";

import withFirebaseAuth from "react-with-firebase-auth";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebaseConfig";

import AuthContext, { AuthProvider } from "views/AuthProvider/authprovider.js";

// pages for this product
import LandingPage from "views/LandingPage/LandingPage.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import AddForm from "views/AddForm/AddForm.js";
import SearchPage from "views/SearchPage/SearchPage.js";
import RegistrationPage from "./views/RegistrationPage/RegistrationPage.js";

// var hist = createBrowserHistory;
const firebaseApp = firebase.initializeApp(firebaseConfig);

const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

console.log(firebaseApp)

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
      <Router> 
        <Switch>
          <Route path="/landing-page" component={LandingPage} />
          <Route path="/login-page" component={LoginPage} />
          <Route path="/add-form" component={AddForm} />
          <Route path="/search-page" component={SearchPage} />
          <Route path="/" component={RegistrationPage} />
        </Switch>
       </Router>       
    </AuthProvider>
  );
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);
