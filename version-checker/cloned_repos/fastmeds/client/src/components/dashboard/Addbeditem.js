import React from "react";
import Addbed from "./Addbed";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import {  Navigate } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
const Addbeditem = ({auth: {type}}) => {
  if(type && type!=="hospital")
  {
    return  <Navigate to='/dashboard'/>
  }
  return (
    <>
      <Container component='main' maxWidth='lg'>
        <CssBaseline />
        <h1>Add Beds</h1>
        <Addbed />
      </Container>
    </>
  );
};

Addbeditem.protoTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Addbeditem);