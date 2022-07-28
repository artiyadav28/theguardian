import React, { useState, useEffect } from "react";
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
import "react-circular-progressbar/dist/styles.css";
import StickyHeadTable from "./Table"
import "./style.css"
const VersionChecker = ({ repo: { loading1, info }, getRepoVersionDetails }) => {
  const [repo, setRepo] = useState("");
  const [packages, setPackages] =useState([]);
  const [requirements, setRequirements] =useState([]);
  const handleClick = () => {
    getRepoVersionDetails(repo);
    // setRepo("");
  };
  useEffect(()=>{
    if(info && !info.error && info.package){
      const arr=[];
      for(const property in info.package){
        const obj={
          name:property,
          current:info.package[property].current,
          latest:info.package[property].latest
        }
        // const element=[property,info.package[property].current,info.package[property].latest];
        // arr.push(<h1>{property} {info.package[property].current} {info.package[property].latest}</h1>)
        arr.push(obj);
      }
      setPackages([...arr]);
    }
    if(info && !info.error && info.requirements){
      const arr=[];
      for(const property in info.requirements){
        const obj={
          name:property,
          current:info.requirements[property].current,
          latest:info.requirements[property].latest
        }
        // const element=[property,info.requirements[property].current,info.requirements[property].latest];
        arr.push(obj);
        // arr.push(<h1>{property} {info.requirements[property].current} {info.requirements[property].latest}</h1>)
      }
      setRequirements([...arr]);
    }
  },[info])
  // console.log(requirements)
  return (
    <>
      <Container component='main' maxWidth='lg' sx={{ mt: 5 }}>
        {/* <div>Home</div> */}
        <h2 className="styled-text">Version Checker</h2>
        <Box
          className="styled_container"
          sx={{
            width: 500,
            maxWidth: "100%",
          }}
        >
          <TextField
            fullWidth
            label='repo link'
            id='fullWidth'
            value={repo}
            onChange={(e) => setRepo(e.target.value)}
          />
          <Button
            sx={{ mt: 1 }}
            variant='contained'
            endIcon={<SendIcon />}
            onClick={handleClick}
            style={{ background: "#C3AED6", color: "black" }}
          >
            Go
          </Button>
        </Box>
        {loading1 ? (
          <Spinner />
        ) : info === null ? (
          <>
            <h3>Enter your Github Repo Link to check for version details</h3>
          </>
        ) : (
          info.error?(
            <h3>{info.error}</h3>
          ):(
          <>
            {info  && info.package && <>
            <h4 className="heading">package.json:</h4>
            <StickyHeadTable rows={packages}/>
            </>}
            {info && info.requirements && <>
            <h4 className="heading">requirements.txt:</h4>
            <StickyHeadTable rows={requirements}/>
            </>}

          </>
          )
        )}
      </Container>
    </>
  );
};


VersionChecker.protoTypes = {
  repo: PropTypes.object.isRequired,
  getRepoVersionDetails: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  repo: state.repo
});

export default connect(mapStateToProps,{getRepoVersionDetails})(VersionChecker);
