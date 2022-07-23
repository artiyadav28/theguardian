import React from 'react'
import Addmeds from './Addmeds'
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import {  Navigate } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
const Additem = ({auth:{type}}) => {
  if(type && type==="hospital")
  {
    return  <Navigate to='/dashboard'/>
  }
  return (
  <>
     
          <Container component="main" maxWidth="lg">
          <CssBaseline />
            <h1>Additem</h1>
              <Addmeds/>
          </Container>
         
    
    </>)
}
Additem.protoTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Additem);
