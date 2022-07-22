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
import { getRepoDetails } from "../../actions/repo";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Dashboard = ({ repo: { loading, info }, getRepoDetails }) => {
  const [repo, setRepo] = useState("");
  // const percentage = 34;
  const color = ["red", "orange", "yellow", "green"];
  const handleClick = () => {
    getRepoDetails(repo);
  };
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
        ) : info === null ? (
          <>
            <h3>Enter your Github Repo Link</h3>
          </>
        ) : (
          <>
            <h3>here is your result</h3>
            <div style={{ width: 200, height: 200 }}>
              <CircularProgressbar
                value={info.score}
                text={`${info.score}%`}
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
                  pathColor: `${color[Math.floor(info.score/25)]}`,
                  textColor: `${color[Math.floor(info.score/25)]}`,
                  // trailColor: "#d6d6d6",
                  // backgroundColor: "#3e98c7",
                })}
              />
            </div>  
          </>
        )}
      </Container>
    </>
  );
};

Dashboard.protoTypes = {
  repo: PropTypes.object.isRequired,
  getRepoDetails: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  repo: state.repo,
});

export default connect(mapStateToProps, { getRepoDetails })(Dashboard);
