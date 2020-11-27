import React, { useState, useRef, useContext } from "react";
import AuthContext, { AuthProvider } from "views/AuthProvider/authprovider.js";
import firebase from "firebase/app";

import { useHistory } from "react-router-dom";

// @material-ui/core components
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import User from "@material-ui/icons/AccountBox";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/bg7.jpg";

const useStyles = makeStyles(styles);

function LoginPage(props) {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const emailRef = useRef();
  const passwordRef = useRef();

  const user = auth.user;
  const {
    signOut,
    signInWithGoogle,
    signInWithEmailAndPassword,
  } = auth.methods;

  console.log(props);
  const googleLogin = (e) => {
    e.preventDefault();
    signInWithGoogle(e);
  };

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      history.push("add-form");
    }
  });

  async function handleSubmit(e) {
    e.preventDefault();
    let email = emailRef.current.value;
    let password = passwordRef.current.value;
    let results = await signInWithEmailAndPassword(email, password);
    console.log(results);
  }

  // const getUserDetails = () => {
  //   if (!user) return "NO USER";
  //   else return `Welcome ${user.displayName}!`;
  // };

  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  return (
    <div>
      <div
        className={classes.pageHeader}
        style={{
          backgroundImage: "url(" + image + ")",
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={8}>
              <Card className={classes[cardAnimaton]}>
                <form className={classes.form}>
                  <CardHeader color="info" className={classes.cardHeader}>
                    <h3 style={{ marginTop: "2rem", fontWeight: "bold" }}>
                      LOGIN
                    </h3>
                    <div className={classes.socialLine}>
                      <div style={{ textAlign: "center" }}>
                        <button onClick={googleLogin}>
                          <Button type="button" color="default">
                            <i
                              className={" fab fa-google"}
                              style={{ marginRight: ".5rem" }}
                            />
                            Click here to Login with Google
                          </Button>
                        </button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <CustomInput
                      labelText="Email..."
                      id="first"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "text",
                        inputRef: emailRef,
                        endAdornment: (
                          <InputAdornment position="end">
                            <User className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <CustomInput
                      labelText="Password"
                      id="pass"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "password",
                        inputRef: passwordRef,
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon className={classes.inputIconsColor}>
                              lock_outline
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off",
                      }}
                    />
                    <div style={{ textAlign: "center" }}>
                      <button onClick={handleSubmit}>
                        <Button justify="center" type="button" color="info">
                          Login
                        </Button>
                      </button>
                    </div>
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Link to={"/registration-page"} className={classes.link}>
                      <Button color="info" simple>
                        Click here to Register
                      </Button>
                    </Link>
                  </CardFooter>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    </div>
  );
}
export default LoginPage;
