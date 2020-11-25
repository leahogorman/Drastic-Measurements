import React from "react";
// material-ui components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Card from "../components/Card/Card.js";
import CardBody from "../components/Card/CardBody.js";
import Button from "../components/CustomButtons/Button.js";

import imagesStyles from "../assets/jss/material-kit-react/imagesStyles.js";

import { cardTitle } from "../assets/jss/material-kit-react.js";

const styles = {
  ...imagesStyles,
  cardTitle,
};

const useStyles = makeStyles(styles);

export default function Login() {
  const classes = useStyles();
  return (
    <Card style={{width: "20rem"}}>
      <img
        style={{height: "180px", width: "100%", display: "block", color: "hotpink"}}
        className={classes.imgCardTop}
        src="..."
        alt="Card-img-cap"
      />
      <CardBody>
        <h4 className={classes.cardTitle}>PLEASE WORK</h4>
        <p>I'm TERRIFIED THIS WILL FAIL!</p>
        <Button color="primary">Do something</Button>
      </CardBody>
    </Card>
  );
}