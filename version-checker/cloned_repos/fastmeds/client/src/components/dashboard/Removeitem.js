import React from 'react'
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Removemeds from './Removemeds';
import {  Navigate } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
const Removeitem = ({auth:{type}}) => {
  if(type && type==="hospital")
  {
    return  <Navigate to='/dashboard'/>
  }
  return (
  <>
     
          <Container component="main" maxWidth="lg">
          <CssBaseline />
            <h1>Bill/Remove Items</h1>
              <Removemeds/>
          </Container>
         
    
    </>)
}

Removeitem.protoTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Removeitem);
