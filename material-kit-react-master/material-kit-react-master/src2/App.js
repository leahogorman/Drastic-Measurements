import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from "react-router-dom";

import withFirebaseAuth from 'react-with-firebase-auth'
import firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebaseConfig';

import Login from "./components/userlogin.js";
import SignUp from "./components/usersignup.js";
import Dashboard from "./components/dashboard.js"
import AuthContext, { AuthProvider } from "./components/authprovider.js";


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
    createUserWithEmailAndPassword
  } = props; 

  const auth = { 
    user,
    accessToken: user ? user.toJSON().stsTokenManager.accessToken : null,
    methods: {
      signOut,
      signInWithGoogle,
      signInWithEmailAndPassword,
      createUserWithEmailAndPassword
    }
  };

  const handleSignOut = (e) => {
    e.preventDefault();
    signOut();    
    window.location.href = '/sign-in';
  }

  console.log(auth);

  return (<AuthProvider value={auth}>
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={"/sign-in"}>positronX.io</Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02"> 
                {          
                  user ? (
                    <ul className="navbar-nav ml-auto">
                      <li className="nav-item">
                        <Link className="nav-link" onClick={handleSignOut}>Sign Out</Link>
                      </li>
                    </ul>
                  ) : (
                    <ul className="navbar-nav ml-auto">
                      <li className="nav-item">
                        <Link className="nav-link" to={"/sign-in"}>Login</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
                      </li>
                    </ul>
                  )
                }
            </div>
          </div>
        </nav>

        <div className="auth-wrapper">
          <div className="auth-inner">
            <Switch>
              <Route exact path='/' component={Login} />
              <Route path="/sign-in" component={Login} />
              <Route path="/sign-up" component={SignUp} />
              <Route path="/dashboard" component={Dashboard} />
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  </AuthProvider>);
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);