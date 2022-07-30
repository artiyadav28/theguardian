// import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import IconButton from '@mui/material/IconButton';
// import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

// export default function Navbar() {
//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <AppBar position="static" style={{background:"white",color:"black"}}>
//         <Toolbar variant="dense">
//           <IconButton edge="start" color="inherit" aria-label="menu">
//             <VerifiedUserIcon />
//           </IconButton>
//           <Typography variant="h6" color="inherit" component="div">
//             Repo Validator
//           </Typography>
//         </Toolbar>
//       </AppBar>
//     </Box>
//   );
// }
import * as React from "react";
import Box from "@mui/material/Box";
import { Link , useLocation} from 'react-router-dom'
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import MuiToolbar from "@mui/material/Toolbar";
import {  useState } from "react";
import { ProSidebar, Menu, MenuItem, SidebarContent , SidebarHeader} from "react-pro-sidebar";
// import "react-pro-sidebar/dist/css/styles.css";
import { FaGem, FaBars } from "react-icons/fa";
import { Button } from "@mui/material";
import { FaList, FaRegHeart } from "react-icons/fa";
import { FiHome, FiLogOut, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import IconButton from '@mui/material/IconButton';
import GitHubIcon from '@mui/icons-material/GitHub';
import CodeIcon from '@mui/icons-material/Code';
import JavascriptIcon from '@mui/icons-material/Javascript';
import PercentIcon from '@mui/icons-material/Percent';
import KeyIcon from '@mui/icons-material/Key';
import "./custom.scss"
function AppBar(props) {
  return (
    <MuiAppBar
      elevation={0}
      position='fixed'
      {...props}
      style={{ background: "white"}}
    />
  );
}

const Toolbar = styled(MuiToolbar)(({ theme }) => ({
  height: 64,
  [theme.breakpoints.up("sm")]: {
    height: 70,
  },
}));

function Navbar() {
  const location = useLocation();
  const path=location.pathname;
  const [toggled, setToggled] = useState(false);
  const handleToggleSidebar = (value) => {
    setToggled(value);
  };
  return (
    <div>
      <AppBar position='fixed'>
        <Toolbar >
            <div
              onClick={() => handleToggleSidebar(!toggled)}
              style={{
                cursor: "pointer",
                width: "40px",
                height: "40px",
                background: "#EEEEEE",
                color: "black",
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
          <Box sx={{ ml:3}} />

          <Link
            style={{fontSize:"2rem",color:"black",marginLeft:"1rem",textDecoration:"none",color:"#039371"}}
            to='/dashboard'
            className="styled-text"
          >
            {/* <VerifiedUserIcon  size="large"/> */}
            {"  The Guardian Project"}
          </Link>
        </Toolbar>
      </AppBar>
      <Toolbar />
        <ProSidebar
          toggled={toggled}
          onToggle={handleToggleSidebar}
          breakPoint='xxl'
        >
            <SidebarHeader>
              <div
                style={{
                  padding: '24px',
                  textTransform: 'uppercase',
                  fontWeight: 'bold',
                  fontSize: 16,
                  letterSpacing: '1px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  color:"black"
                }}
              >
                
              </div>
            </SidebarHeader>
            <SidebarContent>
            {/* C3AED6 */}
          <Menu iconShape='square' style={{color:"black"}} className="styled-text" >
              <MenuItem active={path.includes('/dashboard')} style={{backgroundColor:(!path.includes('/dashboard')?"white":"#EDEDED")}} icon={<FiHome />}>Home <Link to="/dashboard"/></MenuItem>
              <MenuItem active={path.includes('/trust_score')} style={{backgroundColor:(!path.includes('/trust_score')?"white":"#EDEDED")}} icon={<PercentIcon />}>Trust Score <Link to="/legitPercent"/></MenuItem>
              <MenuItem active={path.includes('/git')} style={{backgroundColor:(!path.includes('/git')?"white":"#EDEDED")}}  icon={<GitHubIcon />}>GIT <Link to="/versionChecker"/></MenuItem>
              <MenuItem active={path.includes('/pypi')} style={{backgroundColor:(!path.includes('/pypi')?"white":"#EDEDED")}} icon={<CodeIcon />}>Pypi<Link to="/pypi"/></MenuItem>
              <MenuItem active={path.includes('/npm')} style={{backgroundColor:(!path.includes('/npm')?"white":"#EDEDED")}} icon={<JavascriptIcon />}>Npm<Link to="/npm"/></MenuItem>
              <MenuItem active={path.includes('/sensitive_info')} style={{backgroundColor:(!path.includes('/sensitive_info')?"white":"#EDEDED")}} icon={<KeyIcon />}>Sensitive Info<Link to="/sensitiveinfo"/></MenuItem>
          </Menu>
          </SidebarContent>
        </ProSidebar>
    </div>
  );
}


export default Navbar
