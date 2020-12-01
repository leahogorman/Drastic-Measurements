import React, { useState, useRef, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import SearchIcon from "@material-ui/icons/Search";

// core components
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import Avatar from "components/Avatar/Avatar.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CustomInput from "components/CustomInput/CustomInput.js";
// modal components
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";

import { GetActorByFirstName } from 'utils/API';
import { DeleteActor } from 'utils/API';
import { UpdateActor } from 'utils/API';

import styles from "assets/jss/views/searchPage.js";

import image from "assets/img/100.jpg";

const useStyles = makeStyles(styles);

function SearchPage(props) {
  const search = useRef();
  const waist = useRef();
  const chest = useRef();
  const weight = useRef();
  const [searchedActor, setSearchedActor] = useState([])
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  //trying here first
  const [classicModal, setClassicModal] = React.useState(false);
  setTimeout(function () {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const { ...rest } = props;


  const handleFormSubmit = async function (event) {
    event.preventDefault();
    let searchValue = search.current.value;
    try {
      let results = await GetActorByFirstName(searchValue);
      setSearchedActor(results.data.ActorMany)
      console.log(results);
    } catch (err) {
      console.error(err);
    }
  }

  async function removeActor(id) {
    console.log(id);
    let results = await DeleteActor(id);
    console.log(results);
    setSearchedActor(
      searchedActor.filter((actor) => actor._id !== id)
    );
  }

  // async function renderChanges(id){
  //   let results = await updateMeasurement(id)
  //   console.log(results)
  //   setSearchedActor(
  //     searchedActor.map( actor=> {
  //       if (actor._id === id){

  //       }
  //     })
  //   )
  // }

  async function updateMeasurement(id, actor) {
    console.log(id, actor);
    let editActor = JSON.parse(JSON.stringify(actor));
    editActor.measurements[0].weight = weight.current.value;
    editActor.measurements[0].waist = waist.current.value;
    editActor.measurements[0].chest = chest.current.value;
    console.log(editActor)
    let updatedMeasurement = await UpdateActor(id, editActor);
    console.log(updatedMeasurement);
    setSearchedActor(
      searchedActor.map((actor) => {
        return actor._id === id ? editActor : actor;
      })
    );
  }

  return (
    <div>
      <Header
        absolute
        color="info"
        brand="Drastic Measurements"
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
                      FIND AN ACTOR
                    </h3>
                    <div className={classes.socialLine}>
                      <div style={{ textAlign: "center" }}>
                        <h6></h6>
                      </div>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <CustomInput
                      labelText="Search Actor..."
                      id="first"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "text",
                        inputRef: search,
                        endAdornment: (
                          <InputAdornment position="end">
                            <SearchIcon className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <div style={{ textAlign: "center" }}>
                      <Button onClick={handleFormSubmit} justify="center" type="button" color="info">
                        Find Actor
                      </Button>
                    </div>

                    {searchedActor.length ? (
                      <div className={classes.section}>
                        {searchedActor.map(actor => {
                          return (
                            <Card>
                                  <div style={{position: "relative"}}>
                                    <Button size="sm" onClick={() => removeActor(actor._id)} className={classes.round} style={{ position: "absolute", top: "0", right:"0" }} type="button" color="danger">
            X
                                    </Button>
                                  </div>
                                  <br></br>
                                  <br></br>
                                  <GridContainer justify="center">
                                  <GridItem xs={12} sm={12} md={12} lg={12}>
                                    <h2 style={{textAlign:"center"}} className={classes.title}>Actor Name</h2>
                                  </GridItem>
                                  <GridContainer justify="center">
                                  <GridItem xs={12} sm={12} md={12} lg={12}>
                                    <Avatar alt={`${actor.firstname} ${actor.lastname}`} src={actor.image} />
                                  </GridItem>
                                  </GridContainer>

                               
                                    <GridItem xs={12} sm={12} md={12} lg={12}>
                                      <h4 style={{textAlign: "center"}}>{actor.firstname} {actor.lastname}</h4>
                                    </GridItem>
                                


                                  <GridItem xs={12} sm={12} md={12} lg={12}>

                                    <h2 className={classes.title} style={{textAlign: "center"}}>Measurements</h2>

                                  </GridItem>


                                 
                                    <GridItem xs={12} sm={4} md={4} lg={4}>
                                      <h4 style={{textAlign:"center"}}>Chest: {actor.measurements[0].chest}</h4>
                                    </GridItem>
                                    <GridItem xs={12} sm={4} md={4} lg={4}>
                                      <h4 style={{textAlign:"center"}}>Waist: {actor.measurements[0].waist}</h4>
                                    </GridItem>
                                    <GridItem xs={12} sm={4} md={4} lg={4}>
                                      <h4 style={{textAlign:"center"}}>Weight: {actor.measurements[0].weight}</h4>
                                    </GridItem>
                                 
                                    <br></br>
                                <div style={{ textAlign: "center" }}>
                                <div style={{marginBottom: "3rem", marginTop: "1rem"}}>
                                  <GridItem xs={12} sm={12} md={12} lg={12}>
                                  <Button color="info" onClick={(event) => {
                                    console.log("Shouldnt run right away on edit")
                                    setClassicModal(true);
                                  }} >
                                    Edit
                                </Button>
                                </GridItem>
                                </div>
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

                                      <GridItem xs={12} sm={6} md={6} lg={6}>
                                        <CustomInput
                                          labelText="Weight"
                                          id="measurements.weight"
                                          value={actor.measurements.weight}
                                          formControlProps={{
                                            fullWidth: true,
                                          }}
                                          inputProps={{
                                            type: "weight",
                                            inputRef: weight,


                                            autoComplete: "off",
                                          }}
                                        />
                                      </GridItem>
                                      <GridItem xs={12} sm={6} md={6} lg={6}>
                                        <CustomInput
                                          labelText="Chest"
                                          id="measurements.chest"
                                          value={actor.measurements.chest}
                                          formControlProps={{
                                            fullWidth: true,
                                          }}
                                          inputProps={{
                                            type: "chest",
                                            inputRef: chest,

                                            autoComplete: "off",
                                          }}
                                        />
                                      </GridItem>
                                      <GridItem xs={12} sm={6} md={6} lg={6}>
                                        <CustomInput
                                          labelText="Waist"
                                          id="measurements.waist"
                                          value={actor.measurements.waist}
                                          formControlProps={{
                                            fullWidth: true,
                                          }}
                                          inputProps={{
                                            type: "waist",
                                            inputRef: waist,

                                            autoComplete: "off",
                                          }}
                                        />
                                      </GridItem>

                                      <h5>Edit Actor Measurements</h5>
                                    </DialogContent>
                                   
                                    <DialogActions className={classes.modalFooter}>
                                      <Button
                                        onClick={(event) => {
                                          setClassicModal(false);
                                          updateMeasurement(actor._id, actor)
                                          handleFormSubmit(event)

                                        }} >
              Submit
                                    </Button>
                                    </DialogActions>
                                  </Dialog>
                                </div>
                                <br></br>
                              </GridContainer>
                            </Card>

                          );
                        })}
                      </div>
                    ) : (
                        <h3>No Results to Display</h3>
                      )}
                  </CardBody>
                </form>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
        <Footer whiteFont />
      </div >
    </div >
  );
}

export default SearchPage;
