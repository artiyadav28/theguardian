import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { Navigate } from "react-router-dom";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "../helper/Header";
import Navbar from "../helper/Navbar";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import { getRepoVersionDetails } from "../../actions/repo";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import FavoriteIcon from '@mui/icons-material/Favorite';
import "react-circular-progressbar/dist/styles.css";
import '../parameters/style.css'
const Dashboard = ({ repo: { loading, info }, getRepoVersionDetails }) => {
  const [repo, setRepo] = useState("");
  // const percentage = 34;
  const color = ["red", "orange", "yellow", "green"];
  const handleClick = () => {
    getRepoVersionDetails(repo);
  };
  return (
    <>
      <Container component='main' maxWidth='lg' sx={{ mt: 5 }}>
      <Box
          className="styled_container"
          // style={{backgroundColor:"white",padding:"2rem", borderRadius:"0.7rem"}}
          sx={{
            maxWidth: "100%",
          }}
          style={{marginBottom:"3rem"}}
        >
        <h3 className="text">Open Source Software (OSS) Security Inspector</h3>
        <h3 className="content">Prominent Features</h3>
        <ul>
          <li>
            <h4 className="content">Trust Score</h4>
            <p className="content">EDF probability distribution applied on data scraped from GIT API</p>
          </li>
          <li>
            <h4 className="content">GIT</h4>
            <p className="content">Recursively walk and analyze dependencies of a GIT repository</p>
          </li>
          <li>
            <h4 className="content">PyPI</h4>
            <p className="content">Interact with PyPI API to fetch dependencies of a package and analyze for CVEs</p>
          </li>
          <li>
            <h4 className="content">NPM</h4>
            <p className="content">Interact with NPM API to fetch dependencies of a package and identify vulnerabilities</p>
          </li>
          <li>
            <h4 className="content">Sensitive Info</h4>
            <p className="content">Identify hardcoded secrets, tokens, passwords, emails from a repository</p>
          </li>
        </ul>
        <p style={{textAlign:"center", letterSpacing:"1px",fontWeight:"bold"}} >Made with ❤️ by <a href="https://github.com/imraunn" style={{textDecoration:"none",color:"blue"}}>Raunak</a>, <a href="https://github.com/artiyadav28" style={{textDecoration:"none",color:"blue"}}>Arti</a>, <a href="https://github.com/himanshudas75" style={{textDecoration:"none",color:"blue"}}>Himanshu</a></p>
        </Box>
      </Container>
    </>
  );
};

Dashboard.protoTypes = {
  repo: PropTypes.object.isRequired,
  getRepoVersionDetails: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  repo: state.repo,
});

export default connect(mapStateToProps, { getRepoVersionDetails })(Dashboard);
