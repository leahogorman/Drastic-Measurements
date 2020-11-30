import React, { useContext } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
// @material-ui/icons
import AuthContext from "views/AuthProvider/authprovider.js";
import firebase from 'firebase/app';
import 'firebase/auth';
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Parallax from "components/Parallax/Parallax.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js"
import styles from "assets/jss/views/dashboard.js";

const useStyles = makeStyles(styles);

function Dashboard(props) {
  const auth = useContext(AuthContext);
  const user = auth.user;
  const signOut = auth.methods;  
  
  firebase.auth().onAuthStateChanged(function (user) {
    if (!user) {
      window.location.href = '/';
    }
  });
  

  const  handleSignOut = async(e) => {
    e.preventDefault();
    
    await firebase.auth().signOut()
      console.log("sign out successful")
   

  
  }
  
  console.log("user is", user)
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Parallax className={classes.parallaxDashboard}image={require("assets/img/black1.jpg")}>
        <div className={classes.container}>
          <h3 className={classes.welcome}>Welcome {user?user.displayName:""} </h3>
          <div className={classes.logout}>
      {user ? 
        (
          <Button 
          to="/"
          color="transparent"
          target="_blank"
          className={classes.navLink}>
          <Link to="#" className={classes.dropdownLink} onClick= {handleSignOut}>
             Logout 
          </Link>
         </Button>) : (
          <Button 
          to="/"
          color="transparent"
          target="_blank"
          className={classes.navLink}>
          <Link to="/" className={classes.dropdownLink}>
              Login
          </Link>
          </Button>)}
</div>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={12}>
              <h1
                style={{
                  textAlign: "center",
                  fontSize: "4rem",
                  fontWeight: "900",
                  marginBottom: "5rem",
                }}
              >
                {" "}
                WHAT WOULD YOU LIKE TO DO?{" "}
              </h1>
            </GridItem>
            <GridItem xs={12} sm={6} md={3}>
              <Link to="/search-page">
                <Card className={classes.dashboardCard}>
                  <CardBody>
                    <h4
                      className={classes.cardTitle}
                      style={{ textAlign: "center", fontWeight: "900" }}
                    >
                      SEARCH ACTOR
                    </h4>
                  </CardBody>
                </Card>
              </Link>
            </GridItem>
            <GridItem xs={0} sm={0} md={2}></GridItem>
            <GridItem xs={12} sm={6} md={3}>
              <Link to="/add-actor">
                <Card className={classes.dashboardCard}>
                  <CardBody>
                    <h4
                      className={classes.cardTitle}
                      style={{ textAlign: "center", fontWeight: "900" }}
                    >
                      ADD AN ACTOR
                    </h4>
                  </CardBody>
                </Card>
              </Link>
              
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
    </div>
  );
}

export default Dashboard;
