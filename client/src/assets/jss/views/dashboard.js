import { container, title } from "assets/jss/styles.js";

const dashboardStyle = {
  container: {
    zIndex: "12",
    color: "#FFFFFF",
    ...container,
  },
  parallaxDashboard: {
    background: "black",
    width: "100%",
    height: "100vh",
  },
  welcome: {
    position: "absolute",
    top: 0,
    left: "30px",
  },
  logout: {
    position: "absolute",
    top: 0,
    right: "30px",

  },
  title: {
    ...title,
    display: "inline-block",
    position: "relative",
    marginTop: "30px",
    minHeight: "32px",
    color: "#FFFFFF",
    textDecoration: "none",
  },
  subtitle: {
    fontSize: "1.313rem",
    maxWidth: "500px",
    margin: "10px auto 0",
  },
  main: {
    background: "#FFFFFF",
    position: "relative",
    zIndex: "3",
  },
  mainRaised: {
    margin: "-60px 30px 0px",
    borderRadius: "6px",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
  },
  "@keyframes pulse": {
    "50%": {
      boxShadow:
        "0 0 1vw #00acc1, 0 0 4vw #007d8d, 0 0 12vw #01505a, 0 0 4vw #007d8d, 0 0 1vw #00acc1",
      background: "white",
    },
  },
  dashboardCard: {
    background: "white",
    boxShadow: "0 0 2vw #00acc1" ,
    color: "black",
    animationName: "$pulse",
    animationDuration: "8s",
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
    marginRight: "50%",
    "&:hover": {
      animationIterationCount: "0",
      background: "#00acc1"
    },
  },
};

export default dashboardStyle;
