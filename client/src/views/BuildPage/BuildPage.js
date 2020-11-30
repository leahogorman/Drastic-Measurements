import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card"
import Button from "components/CustomButtons/Button.js";
import styles from "assets/jss/material-kit-react/views/searchPage.js";


const useStyles = makeStyles(styles);

function ProductSection() {
    const classes = useStyles();
    return (
        <div className={classes.section}>
            <Card style={{ textAlign: "center" }}>
            <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={8}>
                    
                    <div>
                      <Button size="sm" round style={{float: "right"}} type="button" color="danger">
                        X
                      </Button>
                    </div>
                    <br></br>
                    <h2 className={classes.title}>Actor Name</h2>
                    
                </GridItem>
            </GridContainer>
                <GridContainer justify="center">
                    <GridItem xs={12} sm={3} md={3}>
                        <h4>First Name</h4>
                    </GridItem>
                    <GridItem xs={12} sm={3} md={3}>
                        <h4>Last Name</h4>
                    </GridItem>
                </GridContainer>
                    <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={8}>
                    <h2 className={classes.title}>Measurements</h2>
                </GridItem>
            </GridContainer>
            <GridContainer>
            <GridItem xs={12} sm={3} md={3}>
                        <h4>Chest</h4>
                    </GridItem>
                    <GridItem xs={12} sm={3} md={3}>
                        <h4>Waist</h4>
                    </GridItem>
                    <GridItem xs={12} sm={3} md={3}>
                        <h4>Weight</h4>
                    </GridItem>
                    <GridItem xs={12} sm={3} md={3}>
                        <h4>Measurement 4</h4>
                    </GridItem>
                </GridContainer>
                <div style={{ textAlign: "center" }}>
                      <Button justify="center" type="button" color="info">
                        Edit Actor
                      </Button>
                    </div>
                    <br></br>
                </Card>
            </div>
            
    );
}

export default ProductSection;