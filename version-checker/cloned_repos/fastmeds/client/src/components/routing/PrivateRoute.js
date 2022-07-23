import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
const PrivateRoute = ({
  children,
  auth: {
    isAuthenticated,
    loading,
  },
}) => {
  return !isAuthenticated && !loading ? (
    <>
      <Navigate to='/auth/login' />
    </>
  ) : children;
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps)(PrivateRoute);

// auth:{ isAuthenticated , loading }
