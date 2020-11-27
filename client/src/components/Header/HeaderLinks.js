/*eslint-disable*/
import React, { useContext } from "react";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

import AuthContext, { AuthProvider } from "views/AuthProvider/authprovider.js";
import firebase from 'firebase/app';
import 'firebase/auth';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import Button from "components/CustomButtons/Button.js";

import styles from "assets/jss/material-kit-react/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);


function HeaderLinks() {
  const auth = useContext(AuthContext);
  const {
    user,
    methods
  } = auth;

  const {
    signOut
  } = methods;

  const handleSignOut = (e) => {
    e.preventDefault();
    firebase.auth().onAuthStateChanged(function (user) {
      if (!user) {
        window.location.href = '/login-page';
      }
    });
    signOut(); 
  }

  const classes = useStyles();
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>
        {user ? 
        (<CustomDropdown
          noLiPadding
          buttonText=""
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={Apps}
          dropdownList={[
            <Link to="/" className={classes.dropdownLink}>
              Home Page
            </Link>,
            <Link to="/search-page" className={classes.dropdownLink}>
               Search Page
            </Link>,
              <Link to="/add-form" className={classes.dropdownLink}>
              Add an Actor
            </Link>,
             <Link to="#" className={classes.dropdownLink} onClick={handleSignOut}>
             Logout
           </Link>,
          ]}
        />) : (<CustomDropdown
          noLiPadding
          buttonText=""
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={Apps}
          dropdownList={[
            <Link to="/" className={classes.dropdownLink}>
            Home Page
          </Link>,
            <Link to="/" className={classes.dropdownLink}>
              Registration Page
            </Link>,
              <Link to="/login-page" className={classes.dropdownLink}>
              Login Page
            </Link>,
          ]}
        />) }
      </ListItem> 
      <ListItem className={classes.listItem}>
        <Button
          href=""
          color="transparent"
          target="_blank"
          className={classes.navLink}
        >
          <CloudDownload className={classes.icons} /> Download the App here
        </Button>
      </ListItem>
    </List>
  );
}
export default HeaderLinks;