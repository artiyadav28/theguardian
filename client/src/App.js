import './App.css';
import { BrowserRouter as Router, Route ,Routes} from 'react-router-dom';
import React , {useEffect} from 'react';
//redux
import {Provider} from 'react-redux';
import store from './store';
import Dashboard from './components/dashboard/Dashboard';
import Navbar from './components/helper/Navbar';
import Header from './components/helper/Header'; 
import Container from "@mui/material/Container";
import Home from './components/Home';
import VersionChecker from './components/parameters/VersionChecker';
import LegitPercent from './components/parameters/LegitPercent';
import SensitiveInfo from './components/parameters/SensitiveInfo';
import Pypi from './components/parameters/Pypi';
import Npm from './components/parameters/Npm';
import Footer from './components/helper/Footer'
const App=()=> {

  return (
    <Provider store={store}>
    <Router>
      <Navbar />
      <Routes>
          <Route path={'/'} element={<Home />} />
          <Route path={'/dashboard'} element={<Dashboard />} />
          <Route path={'/git'} element={<VersionChecker />} />
          <Route path={'/trustscore'} element={<LegitPercent />} />
          <Route path={'/sensitiveinfo'} element={<SensitiveInfo />} />
          <Route path={'/pypi'} element={<Pypi />} />
          <Route path={'/npm'} element={<Npm />} />
      </Routes>
      {/* <Footer/> */}
    </Router>
    </Provider>
    // <Provider store={store}>
    // <Router>
    // <Navbar />
    //   <div style={{display:"flex",flexDirection:"row"}}>
    //     <div style={{width:"25%"}}>
    //       <Header />
    //     </div>
    //     <div style={{width:"75%"}}>
    //       <Routes>
    //         <Route path={'/'} element={<Home />} />
    //         <Route path={'/dashboard'} element={<Dashboard />} />
    //         <Route path={'/versionChecker'} element={<VersionChecker />} />
    //         <Route path={'/legitPercent'} element={<LegitPercent />} />
    //         <Route path={'/sensitiveinfo'} element={<SensitiveInfo />} />
    //       </Routes>
    //     </div>
    //   </div>
    // </Router>
    // </Provider>
  );
}

export default App;
