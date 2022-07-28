import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{background:"white",color:"black"}}>
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="menu">
            <VerifiedUserIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            Repo Validator
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
