import React,{useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
import Person from "@material-ui/icons/Person";
import SearchIcon from "@material-ui/icons/Search";

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
import Input from "@material-ui/core/Input"

import { AddActor} from 'utils/API';

import styles from "assets/jss/material-kit-react/views/loginPage.js";

import image from "assets/img/bg7.jpg";

const useStyles = makeStyles(styles);

function InsertActor(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [actor, setActor] = useState({
    firstname: "",
    lastname: "",
    measurements:{
      chest:"",
      waist:"",
      weight:""
    }
  })
  function handleInputChange(event) {

    //This function takes a flattened object and turns it into a standard object 
    // https://stackoverflow.com/questions/42694980/how-to-unflatten-a-javascript-object-in-a-daisy-chain-dot-notation-into-an-objec
    let unflatten = function (data) {
      var result = {}
      for (var i in data) {
        var keys = i.split('.')
        keys.reduce(function(r, e, j) {
          return r[e] || (r[e] = isNaN(Number(keys[j + 1])) ? (keys.length - 1 == j ? data[i] : {}) : [])
        }, result)
      }
      return result
    }

    console.log('handleInputChange')
    const { id, value } = event.target;
    console.log(id, value, unflatten({...actor, [id]: value}))
    setActor({...actor, [id]: value})
    console.log("Id and Value are", id,value)
  }

 const handleFormSubmit = async function(event){
   console.log("button clicked");
   event.preventDefault();


   
   try {
    let results = await AddActor(actor );
  
    console.log(results);
  } catch(err) {
    console.error(err);
  }

  }
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
        brand="Shaun Was Here"
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
            <GridItem xs={12} sm={12} md={4}>
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
                    <CustomInput
                      labelText="Search Actor..."
                      id="search"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "text",
                        onChange: handleInputChange,
                        endAdornment: (
                          <InputAdornment position="end">
                            <SearchIcon className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />
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
                    <CustomInput
                      labelText="Email..."
                      id="email"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "email",
                        onChange: handleInputChange,
                        endAdornment: (
                          <InputAdornment position="end">
                            <Email className={classes.inputIconsColor} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <CustomInput
                      labelText="Height"
                      id="height"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "height",
                        onChange: handleInputChange,
                        
                        // endAdornment: (
                        //   <InputAdornment position="end">
                        //     <Icon className={classes.inputIconsColor}>
                        //       lock_outline
                        //     </Icon>
                        //   </InputAdornment>
                        // ),
                        autoComplete: "off",
                      }}
                    />
                    <CustomInput
                      labelText="Weight"
                      id="weight"
                      onChange={handleInputChange}
                      value={actor.measurements.weight}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "weight",
                        onChange: handleInputChange,
                      
                        // endAdornment: (
                        //   <InputAdornment position="end">
                        //     <Icon position="end">
                        //       <LockOpen className={classes.inputIconsColor} />
                        //     </Icon>
                        //   </InputAdornment>
                        // ),
                        autoComplete: "off",
                      }}
                    />
                    <CustomInput
                      labelText="Chest"
                      id="chest"
                      onChange={handleInputChange}
                      value={actor.measurements.chest}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "chest",
                        onChange: handleInputChange,
                        // endAdornment: (
                        //   <InputAdornment position="end">
                        //     <Icon position="end">
                        //       <LockOpen className={classes.inputIconsColor} />
                        //     </Icon>
                        //   </InputAdornment>
                        // ),
                        autoComplete: "off",
                      }}
                    />
                    <CustomInput
                      labelText="Waist"
                      id="waist"
                      onChange={handleInputChange}
                        value={actor.measurements.waist}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        type: "waist",
                        onChange: handleInputChange,
                        // endAdornment: (
                        //   <InputAdornment position="end">
                        //     <Icon position="end">
                        //       <LockOpen className={classes.inputIconsColor} />
                        //     </Icon>
                        //   </InputAdornment>
                        // ),
                        autoComplete: "off",
                      }}
                    />
                    <div style={{ textAlign: "center" }}>
                      <Button justify="center" type="button" color="info">
                        Register
                      </Button>
                    </div>
                  </CardBody>
                  <CardFooter className={classes.cardFooter}>
                    <Button onClick={handleFormSubmit} color="info" simple>
                      Add Actor
                    </Button>
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
