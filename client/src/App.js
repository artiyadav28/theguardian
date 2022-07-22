import './App.css';
import { BrowserRouter as Router, Route ,Routes} from 'react-router-dom';
import React , {useEffect} from 'react';
//redux
import {Provider} from 'react-redux';
import store from './store';
import Dashboard from './components/dashboard/Dashboard';
import Parameter1 from './components/parameters/Parameter1';
import Parameter2 from './components/parameters/Parameter2';
import Navbar from './components/helper/Navbar';
import Header from './components/helper/Header'; 
import Container from "@mui/material/Container";
import Home from './components/Home';
const App=()=> {

  return (
    <Provider store={store}>
    <Router>
      <Navbar />
      <div className='flex-container'>
      <Header />
      <main>
      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'/dashboard'} element={<Dashboard />} />
        <Route path={'/parameter1'} element={<Parameter1 />} />
        <Route path={'/parameter2'} element={<Parameter2 />} />
      </Routes>
      </main>
      </div>
    </Router>
    </Provider>
  );
}

export default App;
