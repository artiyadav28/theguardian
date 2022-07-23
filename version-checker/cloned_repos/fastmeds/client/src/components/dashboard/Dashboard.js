import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {  Navigate } from 'react-router-dom';
import ProfileCard from '../helper/ProfileCard';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
const Dashboard = ({
  auth: { user, isAuthenticated , loading},
}) => {
    if(!loading && !isAuthenticated){
        return  <Navigate to='/auth/login'/>
    }
  return (
    <Fragment>
       
        {user !== null && !loading && <>
        <Container component="main" maxWidth="lg" sx={{mt:20}}>
        <CssBaseline />
          <ProfileCard user={user}/>
          </Container>
        </>}
      
    </Fragment>
  );
};

Dashboard.protoTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(
  Dashboard
);