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
import { getRepoDetails } from "../../actions/repo";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Parameter1 = ({ repo: { loading, info }}) => {
  return (
    <>
      <Container component='main' maxWidth='lg' sx={{ mt: 5 }}>
        {loading ? (
          <Spinner />
        ) : info === null ? (
          <>
            <h3>Get started and enter your Github Repo Link</h3>
          </>
        ) : (
          <>
            <h3>{info.param1.score}</h3>
            <h3>{info.param1.text}</h3>
          </>
        )}
      </Container>
    </>
  );
};

Parameter1.protoTypes = {
  repo: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  repo: state.repo,
});

export default connect(mapStateToProps,null)(Parameter1);
