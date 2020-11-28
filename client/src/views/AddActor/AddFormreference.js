import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import Person from "@material-ui/icons/Person";

// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import CustomInput from "components/CustomInput/CustomInput.js";

import styles from "assets/jss/views/loginPage.js";

import image from "assets/img/bg7.jpg";

const useStyles = makeStyles(styles);

export default function LoginPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header
        absolute
        color="info"
        brand="Blood Falcon Project 3"
        rightLinks={<HeaderLinks />}
        {...rest}
      />
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
                      ADD AN ACTOR
                    </h3>
                    <div className={classes.socialLine}>
                      <div style={{ textAlign: "center" }}>
                        <h6>ENTER ACTOR MEASUREMENTS BELOW</h6>
                      </div>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <GridContainer justify="center">
                    <GridItem xs={12} sm={6} md={6} lg={6}>
                        <CustomInput
                          labelText="First Name..."
                          id="first"
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            type: "text",
                            endAdornment: (
                              <InputAdornment position="end">
                                <Person className={classes.inputIconsColor} />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={6} md={6} lg={6}>
                        <CustomInput
                          labelText="Last Name..."
                          id="first"
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            type: "text",
                            endAdornment: (
                              <InputAdornment position="end">
                                <Person className={classes.inputIconsColor} />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </GridItem>
                  
                      <GridItem xs={12} sm={6} md={6} lg={6}>
                        <CustomInput
                          labelText="Height"
                          id="height"
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            type: "height",
                            endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                            autoComplete: "off",
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={6} md={6} lg={6}>
                        <CustomInput
                          labelText="Weight"
                          id="weight"
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            type: "weight",
                            endAdornment: <InputAdornment position="end">Kg</InputAdornment>,
                            autoComplete: "off",
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={6} md={6} lg={6}>
                        <CustomInput
                          labelText="Chest"
                          id="chest"
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            type: "chest",
                            endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                            autoComplete: "off",
                          }}
                        />
                      </GridItem>
                     
                      </GridContainer>

                      <div style={{ textAlign: "center" }}>
                        <Button justify="center" type="button" color="info">
                          Register
                        </Button>
                      </div>
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>

                    </CardFooter>
                  </form>
                </Card>
              </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div>
    </div>
  );
}
