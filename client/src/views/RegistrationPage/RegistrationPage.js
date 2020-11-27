import React, { useContext, useRef } from "react";
// @material-ui/core components
import { Link, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import People from "@material-ui/icons/People";
import Person from "@material-ui/icons/Person";
import LockOpen from "@material-ui/icons/LockOpen";
import User from "@material-ui/icons/AccountBox";

import AuthContext, { AuthProvider } from "views/AuthProvider/authprovider.js";
import firebase from 'firebase/app';
import 'firebase/auth';

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

function RegistrationPage(props) {

  const history = useHistory();
  const auth = useContext(AuthContext);
  const form = {
    email: useRef(),
    first: useRef(),
    last: useRef(),
    password: useRef(),
    password_reentered: useRef(),
  };

  const {
    user,
    methods
  } = auth;

  const {
    createUserWithEmailAndPassword
  } = methods;

  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);



  const handleRegistration = async function(e) {
    e.preventDefault();            
    let first = form.first.current.value;
    let last = form.last.current.value;
    let email = form.email.current.value;
    let password = form.password.current.value;
    let password_reentered = form.password_reentered.current.value;

    firebase.auth().onAuthStateChanged(async function(user) {
        if (user) {
            await user.updateProfile({
                displayName: `${first} ${last}`
            });
            history.push('/add-form');
        }
    });

    let newUser = await firebase.auth().createUserWithEmailAndPassword(email, password);        
  };

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
                      REGISTRATION
                    </h3>
                    <div className={classes.socialLine}>
                      <div style={{ textAlign: "center" }}>
                        <Button type="button" color="default" simple>
                          <i
                            className={" fab fa-google"}
                            style={{ marginRight: ".5rem" }}
                          />
                          Click here to Login with Google
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <CustomInput
                      labelText="First Name..."
                      id="first"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "text",
                        inputRef: form.first,
                        endAdornment: (
                          <InputAdornment position="end">
                            <Person className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <CustomInput
                      labelText="Last Name..."
                      id="last"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "text",
                        inputRef: form.last,
                        endAdornment: (
                          <InputAdornment position="end">
                            <People className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <CustomInput
                      labelText="Email..."
                      id="email"
                      formControlProps={{
                        fullWidth: true,
                      }}                      
                      inputProps={{
                        type: "email",
                        inputRef: form.email,
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputIconsColor} />
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
                        inputRef: form.password,
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
                    <CustomInput
                      labelText="Reenter Password"
                      id="pass2"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "password",
                        inputRef: form.password_reentered,
                        endAdornment: (
                          <InputAdornment position="end">
                            <Icon position="end">
                              <LockOpen className={classes.inputIconsColor} />
                            </Icon>
                          </InputAdornment>
                        ),
                        autoComplete: "off",
                      }}
                    />
                    <div style={{ textAlign: "center" }}>
                      <Button onClick={handleRegistration} justify="center" type="button" color="info">
                        Register
                      </Button>
                    </div>
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Link to={"/login-page"} className={classes.link}>
                      <Button color="info" simple>
                        Click here to Login
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
export default RegistrationPage;