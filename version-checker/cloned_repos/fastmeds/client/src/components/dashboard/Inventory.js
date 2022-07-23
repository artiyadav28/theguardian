import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import InventoryBedTable from "./InventoryBedTable";
import InventoryMedTable from "./InventoryMedTable";

function Inventory({ auth: { loading, user } }) {
  // if(user!=null && !loading) console.log(inventory);
  return (
    !loading &&
    user && (
      <Container component='main' maxWidth='lg'>
        <CssBaseline />
        {user.userType === "hospital" ? (
          <>
            <h1>Free Beds</h1>
            <InventoryBedTable rows={user.inventory} />
          </>
        ) : (
          <>
            <h1>Available Meds</h1>
            <InventoryMedTable rows={user.inventory} />
          </>
        )}
        {user.inventory.length===0 && <h3>Empty Inventory</h3>}
      </Container>
    )
  );
}

Inventory.protoTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(Inventory);
