import React from 'react'
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import RemoveBed from './Removebed';
import {  Navigate } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
const Removebeditem = ({auth:{type}}) => {
  if(type && type!=="hospital")
  {
    return  <Navigate to='/dashboard'/>
  }
  return (
  <>
     
          <Container component="main" maxWidth="lg">
          <CssBaseline />
            <h1>Bill/Remove Beds</h1>
              <RemoveBed/>
          </Container>
         
    
    </>)
}

Removebeditem.protoTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Removebeditem);
