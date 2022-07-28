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
import { getNpmDetails } from "../../actions/repo";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import StickyHeadTable from "./Table"
import "./style.css"
const Npm = ({ repo: { loading, npm }, getNpmDetails }) => {
  const [repo, setRepo] = useState("");
  const [packages, setPackages] =useState([]);
  const handleClick = () => {
    getNpmDetails(repo);
    // setRepo("");
  };
  useEffect(()=>{
    if(npm && !npm.error && npm.package){
      const arr=[];
      for(const property in npm.package){
        const obj={
          name:property,
          current:npm.package[property].current,
          latest:npm.package[property].latest
        }
        // const element=[property,npm.package[property].current,npm.package[property].latest];
        // arr.push(<h1>{property} {npm.package[property].current} {npm.package[property].latest}</h1>)
        arr.push(obj);
      }
      setPackages([...arr]);
    }
  },[npm])
  // console.log(requirements)
  return (
    <>
      <Container component='main' maxWidth='lg' sx={{ mt: 5 }}>
        {/* <div>Home</div> */}
        <h2 className="styled-text">Npm</h2>
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
        {loading ? (
          <Spinner />
        ) : npm === null ? (
          <>
            <h3>Enter the npm package Link to check for npm details</h3>
          </>
        ) : (
          npm.error?(
            <h3>{npm.error}</h3>
          ):(
          <>
            {npm  && npm.package && <>
            <h4 className="heading">package.json:</h4>
            <StickyHeadTable rows={packages}/>
            </>}

          </>
          )
        )}
      </Container>
    </>
  );
};


Npm.protoTypes = {
  repo: PropTypes.object.isRequired,
  getNpmDetails: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  repo: state.repo
});

export default connect(mapStateToProps,{getNpmDetails})(Npm);
