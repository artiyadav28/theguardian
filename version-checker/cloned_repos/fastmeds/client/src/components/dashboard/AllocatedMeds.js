import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import AllocatedMedsTable from "./AllocatedMedsTable";
import { Navigate } from "react-router-dom";
function AllocatedMeds({ auth: { user, loading, type } }) {
  if (type && type === "hospital") {
    return <Navigate to='/dashboard' />;
  }
  return (
    !loading &&
    user && (
      <Container component='main' maxWidth='lg'>
        <CssBaseline />
        <h1>Allocated Meds</h1>
        <AllocatedMedsTable rows={user.billings} />
        {user.billings.length===0 && <h3>No billings done yet</h3>}
      </Container>
    )
  );
}

AllocatedMeds.protoTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(AllocatedMeds);
