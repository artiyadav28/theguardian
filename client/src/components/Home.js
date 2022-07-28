import React from 'react'
import PropTypes from 'prop-types'
import { Navigate } from "react-router-dom";

function Home(props) {
  
  return (
    <>
    <Navigate to="/dashboard"></Navigate>
    <div>Home</div>
    </>
  )
}

Home.propTypes = {}

export default Home
