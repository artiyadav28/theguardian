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

const color = ["red", "orange", "yellow", "green"];
const LegitPercent = ({
  repo: { loading, legit },
  getRepoLegitPercentDetails,
}) => {
  const [repo, setRepo] = useState("");
  const [rows,setRows]=useState([]);
  const [name,setName]=useState("");
  const [percentage, setPercentage]= useState(0);
  const handleClick = () => {
    getRepoLegitPercentDetails(repo);
    setRepo("");
  };
  useEffect(()=>{
    if(legit){
      for(const repoName in legit){
        setName(repoName);
        setPercentage(legit[repoName].percentage);
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
        <Box
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
            style={{ background: "#FED322", color: "black" }}
          >
            Go
          </Button>
        </Box>
        {loading ? (
          <Spinner />
        ) : legit === null ? (
          <>
            <h3>Enter your Github Repo Link to calculate legit percentage</h3>
          </>
        ) : (
          <>
            {/* {console.log(legit)} */}
              <h3>{name}</h3>
              <div style={{ width: 200, height: 200 }}>
              <CircularProgressbar
                value={percentage}
                text={`${percentage}%`}
                styles={buildStyles({
                  // Rotation of path and trail, in number of turns (0-1)
                  // rotation: 0.25,

                  // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                  strokeLinecap: "round",

                  // Text size
                  // textSize: "16px",

                  // How long animation takes to go from one percentage to another, in seconds
                  // pathTransitionDuration: 0.5,

                  // Can specify path transition in more detail, or remove it entirely
                  // pathTransition: 'none',

                  // Colors
                  pathColor: `${color[Math.floor(percentage/25)]}`,
                  textColor: `${color[Math.floor(percentage/25)]}`,
                  // trailColor: "#d6d6d6",
                  // backgroundColor: "#3e98c7",
                })}
              />
            </div>  
              <h3>Individual Scores</h3>
              <StickyHeadTable rows={rows}/>
          </>
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
