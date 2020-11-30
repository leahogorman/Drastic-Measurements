import React, { useState } from "react";
import axios from "axios";

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
// modal components
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";



import { AddActor } from 'utils/API';

import styles from "assets/jss/views/addActor.js";

import image from "assets/img/100.jpg";

const rapidAPIHeaders = {
  "x-rapidapi-host": "contextualwebsearch-websearch-v1.p.rapidapi.com",
  "x-rapidapi-key": "aa57de8da2msh886a93f00274292p191c06jsn1d67d9615903"
};

const useStyles = makeStyles(styles);


function InsertActor(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [actor, setActor] = useState({
    firstname: "",
    lastname: "",
    image: "",
    measurements: {
      chest: "",
      waist: "",
      weight: ""
    }
  })

  async function getActorImage(name) {
    const options = {
      method: 'GET',
      url: 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI',
      params: { pageNumber: '1', pageSize: '10', q: name, autoCorrect: 'true' },
      headers: rapidAPIHeaders
    };
    try {
      return (await axios.request(options)).data;
    } catch (error) {
      console.error(error);
    }
  }



  function handleInputChange(event) {
    let { id, value } = event.target;
    if (id.startsWith('measurements.')) {
      actor.measurements[id.split('.')[1]] = value
      setActor(actor);
    } else {
      setActor({ ...actor, [id]: value })
    }
  }

  const handleFormSubmit = async function (event) {
    console.log("button clicked");
    event.preventDefault();
    let imageResult = await getActorImage(`${actor.firstname} ${actor.lastname}`);
    console.log(imageResult);
    let imgurl = imageResult.value[0].url
    console.log(imgurl);
    actor.image = imgurl;
    try {
      let results = await AddActor(actor);

      console.log(results);
    } catch (err) {
      console.error(err);
    }

  }
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;
  const [classicModal, setClassicModal] = React.useState(false);
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
                    <GridContainer style={{ marginTop: "1rem", borderTop: "1px solid black", position: "relative" }}>
                      <GridItem xs={12} sm={12} md={12} lg={12} style={{ marginBottom: "1rem" }}>
                        <h4 className={classes.idontknow} style={{ textAlign: "center", position: "absolute", top: "-25px", left: "40%", right: "40%", backgroundColor: "white", width: "120px" }}>Enter Name</h4>
                      </GridItem>
                    </GridContainer>
                    <GridContainer justify="center">
                      <GridItem xs={12} sm={6} md={6} lg={6}>
                        <CustomInput
                          labelText="First Name..."
                          id="firstname"
                          value={actor.firstname}
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            type: "text",
                            onChange: handleInputChange,
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
                          id="lastname"
                          onChange={handleInputChange}
                          value={actor.lastname}
                          formControlProps={{
                            fullWidth: true,
                          }}
                          inputProps={{
                            type: "text",
                            onChange: handleInputChange,
                            endAdornment: (
                              <InputAdornment position="end">
                                <Person className={classes.inputIconsColor} />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </GridItem>

                      <GridContainer style={{ marginTop: "5rem", borderTop: "1px solid black", position: "relative" }}>
                        <GridItem xs={12} sm={12} md={12} lg={12} style={{ marginBottom: "1rem" }}>
                          <h4 className={classes.idontknow} style={{ textAlign: "center", position: "absolute", top: "-25px", left: "35%", right: "35%", backgroundColor: "white", width: "190px" }}>Enter Measurements</h4>
                        </GridItem>


                        <GridItem xs={12} sm={6} md={6} lg={6}>
                          <CustomInput
                            labelText="Weight"
                            id="measurements.weight"
                            onChange={handleInputChange}
                            value={actor.measurements.weight}
                            formControlProps={{
                              fullWidth: true,
                            }}
                            inputProps={{
                              type: "weight",
                              onChange: handleInputChange,


                              autoComplete: "off",
                            }}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={6} md={6} lg={6}>
                          <CustomInput
                            labelText="Chest"
                            id="measurements.chest"
                            onChange={handleInputChange}
                            value={actor.measurements.chest}
                            formControlProps={{
                              fullWidth: true,
                            }}
                            inputProps={{
                              type: "chest",
                              onChange: handleInputChange,

                              autoComplete: "off",
                            }}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={6} md={6} lg={6}>
                          <CustomInput
                            labelText="Waist"
                            id="measurements.waist"
                            onChange={handleInputChange}
                            value={actor.measurements.waist}
                            formControlProps={{
                              fullWidth: true,
                            }}
                            inputProps={{
                              type: "waist",
                              onChange: handleInputChange,

                              autoComplete: "off",
                            }}
                          />
                        </GridItem>
                      </GridContainer>
                    </GridContainer>

                    {/* <Button onClick={handleFormSubmit} color="info" >
                      Add Actor
                    </Button> */}


                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button color="info" onClick={(event) => {
                      setClassicModal(true);
                      handleFormSubmit(event)

                    }} >
                      Add Actor
                    </Button>
                    <Dialog
                      classes={{
                        root: classes.center,
                        paper: classes.modal,
                      }}
                      open={classicModal}
                      keepMounted
                      onClose={() => setClassicModal(false)}
                      aria-labelledby="classic-modal-slide-title"
                      aria-describedby="classic-modal-slide-description"
                    >
                      <DialogContent
                        id="classic-modal-slide-description"
                        className={classes.modalBody}
                      >
                        <h5>Actor Added Successfully!!!</h5>
                      </DialogContent>
                      <DialogActions className={classes.modalFooter}>
                        <Button
                          onClick={() => setClassicModal(false)}
                          color="danger"
                          simple
                        >
                          Close
                    </Button>
                      </DialogActions>
                    </Dialog>








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

export default InsertActor;
