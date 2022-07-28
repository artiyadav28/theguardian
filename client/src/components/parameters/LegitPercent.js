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
import { getRepoLegitPercentDetails } from "../../actions/repo";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import StickyHeadTable from "./Table2";
import ProgressProvider from "./ProgressProvider";
import "./style.css"
const color = ["#B20600", "#E45826", "#F0A500", "#76BA99"];
const LegitPercent = ({
  repo: { loading2, legit },
  getRepoLegitPercentDetails,
}) => {
  const [repo, setRepo] = useState("");
  const [rows,setRows]=useState([]);
  const [name,setName]=useState("");
  const [percentage, setPercentage]= useState(0);
  const handleClick = () => {
    getRepoLegitPercentDetails(repo);
    // setRepo("");
  };
  useEffect(()=>{
    if(legit && !legit.error){
      for(const repoName in legit){
        setName(repoName);
        setPercentage(legit[repoName].percentage);
        // setPercentage(78);
        const forks={
          name:"forks",
          number: legit[repoName].forks[0],
          percentage: legit[repoName].forks[1],
        }
        const stars={
          name:"stars",
          number: legit[repoName].stars[0],
          percentage: legit[repoName].stars[1],
        }
        const watchers={
          name:"watchers",
          number: legit[repoName].watchers[0],
          percentage: legit[repoName].watchers[1],
        }
        const arr=[forks,stars,watchers];
        setRows(arr);
      }
    }
  },[legit])
  return (
    <>
      <Container component='main' maxWidth='lg' sx={{ mt: 5 }}>
        {/* <div>Home</div> */}
        <h2 className="styled-text">Legit Percent</h2>
        <Box
          className="styled_container"
          // style={{backgroundColor:"white",padding:"2rem", borderRadius:"0.7rem"}}
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
        {loading2 ? (
          <Spinner />
        ) : legit === null ? (
          <>
            <h3>Enter your Github Repo Link to calculate legit percentage</h3>
          </>
        ) : (
          legit.error ?(
            <h3>{legit.error}</h3>
          ):(
          <>
            {/* {console.log(legit)} */}
              <h3>{name}</h3>
              <div style={{ width: 200, height: 200 }}>
              <ProgressProvider valueStart={0} valueEnd={percentage}>
                {(value) => <CircularProgressbar
                value={value}
                text={`${value}%`}
                styles={buildStyles({
                  // Rotation of path and trail, in number of turns (0-1)
                  // rotation: 0.25,

                  // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                  strokeLinecap: "round",

                  // Text size
                  // textSize: "16px",

                  // How long animation takes to go from one percentage to another, in seconds
                  pathTransitionDuration: 2,

                  // Can specify path transition in more detail, or remove it entirely
                  // pathTransition: 'none',

                  // Colors
                  pathColor: `${color[Math.floor(value/25)]}`,
                  textColor: `${color[Math.floor(value/25)]}`,
                  trailColor: "#d6d6d6",
                  // backgroundColor: "#3e98c7",
                })}
              />}
              </ProgressProvider>
            </div>  
              <h3>Individual Scores</h3>
              <StickyHeadTable rows={rows}/>
          </>
          )
        )}
      </Container>
    </>
  );
};

LegitPercent.protoTypes = {
  repo: PropTypes.object.isRequired,
  getRepoLegitPercentDetails: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  repo: state.repo,
});

export default connect(mapStateToProps, { getRepoLegitPercentDetails })(
  LegitPercent
);
