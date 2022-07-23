import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import AllocatedBedsTable from "./AllocatedBedsTable";
import { freeBed } from "../../actions/item";
import { Navigate } from "react-router-dom";
function AllocatedBeds({ auth: { user, loading, type }, freeBed }) {
  const freeBedFunc = (id, medName) => {
    freeBed({
      id,
      medName,
    });
  };
  if (type && type !== "hospital") {
    return <Navigate to='/dashboard' />;
  }
  return (
    !loading &&
    user && (
      <Container component='main' maxWidth='lg'>
        <CssBaseline />
        <h1>Allocated Beds</h1>
        <AllocatedBedsTable rows={user.billings} freeBed={freeBedFunc} />
        {user.billings.length===0 && <h3>No beds allocated</h3>}
      </Container>
    )
  );
}

AllocatedBeds.protoTypes = {
  freeBed: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { freeBed })(AllocatedBeds);
