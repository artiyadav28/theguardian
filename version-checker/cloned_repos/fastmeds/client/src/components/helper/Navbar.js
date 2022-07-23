import * as React from "react";
import Box from "@mui/material/Box";
import { Link } from 'react-router-dom'
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import MuiToolbar from "@mui/material/Toolbar";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import {  useState } from "react";
import { ProSidebar, Menu, MenuItem} from "react-pro-sidebar";
// import "react-pro-sidebar/dist/css/styles.css";
import { FaGem, FaBars } from "react-icons/fa";
import { Button } from "@mui/material";
import "./custom.scss"
function AppBar(props) {
  return (
    <MuiAppBar
      elevation={0}
      position='fixed'
      {...props}
      style={{ background: "linear-gradient(150deg, #4341be, #23d1a8)"}}
    />
  );
}

const Toolbar = styled(MuiToolbar)(({ theme }) => ({
  height: 64,
  [theme.breakpoints.up("sm")]: {
    height: 70,
  },
}));

function Navbar({ auth: { isAuthenticated , type }, logout }) {
  const [toggled, setToggled] = useState(false);
  const handleToggleSidebar = (value) => {
    setToggled(value);
  };
  return (
    <div>
      <AppBar position='fixed'>
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {isAuthenticated && (
            <div
              onClick={() => handleToggleSidebar(!toggled)}
              style={{
                cursor: "pointer",
                width: "40px",
                height: "40px",
                background: "#2B2B2B",
                color: "#fff",
                textAlign: "center",
                borderRadius: " 50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "15px",
              }}
            >
              <FaBars />
            </div>
          )}
          <Box sx={{ ml:3}} />

          <Link
            style={{fontSize:"2rem",color:"white",}}
            to='/'
           
          >
            {"FastMeds"}
          </Link>
          {isAuthenticated === false ? (
            <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
              <Link
                style={{marginRight:"10px",color:"white"}}
                to='/auth/login'
                
              >
                {"Sign In"}
              </Link>
              <Link
                style={{color:"white"}}
                to='/auth/register'
             
              >
                {"Sign Up"}
              </Link>
            </Box>
          ) : (
            <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
              <Button
               style={{color:"white"}}
                onClick={logout}
                
              >
                {"logout"}
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
      {isAuthenticated && (
        <ProSidebar
          toggled={toggled}
          onToggle={handleToggleSidebar}
          breakPoint='xxl'
        >
          <Menu iconShape='square' >
          
            <MenuItem icon={<FaGem />} >
              <Link to='/dashboard' >Dashboard</Link>
            </MenuItem>
            {type && type!=="hospital" && <MenuItem icon={<FaGem />}><Link to='/dashboard/additem' >Add Items</Link></MenuItem>}
            {type && type==="hospital" && <MenuItem icon={<FaGem />}><Link to='/dashboard/addbed' >Add Beds</Link></MenuItem>}
            {type && type==="hospital" && <MenuItem icon={<FaGem />}><Link to='/dashboard/allocatedbeds' >Allocated Beds</Link></MenuItem>}
            {type && type!=="hospital" && <MenuItem icon={<FaGem />}><Link to='/dashboard/allocatedmeds' >Allocated Meds</Link></MenuItem>}
            {type && type!=="hospital" && <MenuItem icon={<FaGem />}><Link to='/dashboard/removeitem' >Bill/Remove Items</Link></MenuItem>}
            {type && type==="hospital" && <MenuItem icon={<FaGem />}><Link to='/dashboard/removebed' >Bill/Remove Beds</Link></MenuItem>}
            <MenuItem icon={<FaGem />}><Link to='/dashboard/viewinventory' >View Inventory</Link></MenuItem>
          </Menu>
        </ProSidebar>
      )}
    </div>
  );
}

Navbar.protoTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
