import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { Navigate } from "react-router-dom";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "../helper/Header";
import Navbar from "../helper/Navbar";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import { getRepoVersionDetails } from "../../actions/repo";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Dashboard = ({ repo: { loading, info }, getRepoVersionDetails }) => {
  const [repo, setRepo] = useState("");
  // const percentage = 34;
  const color = ["red", "orange", "yellow", "green"];
  const handleClick = () => {
    getRepoVersionDetails(repo);
  };
  return (
    <>
      <Container component='main' maxWidth='lg' sx={{ mt: 5 }}>
      <link type="image/png" sizes="16x16" rel="icon" href="./icons8-python-16.png"/>
      </Container>
    </>
  );
};

Dashboard.protoTypes = {
  repo: PropTypes.object.isRequired,
  getRepoVersionDetails: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  repo: state.repo,
});

export default connect(mapStateToProps, { getRepoVersionDetails })(Dashboard);
