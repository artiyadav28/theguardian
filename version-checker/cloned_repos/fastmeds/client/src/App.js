import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { BrowserRouter as Router, Route ,Routes} from 'react-router-dom';
import React , {useEffect} from 'react';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
//redux
import {Provider} from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import Home from './components/Home';
import Dashboard from './components/dashboard/Dashboard';
import Additem from './components/dashboard/Additem';
import Navbar from './components/helper/Navbar';
import Removeitem from './components/dashboard/Removeitem';
import Addbeditem from './components/dashboard/Addbeditem';
import Removebeditem from './components/dashboard/Removebeditem';
import AllocatedBeds from './components/dashboard/AllocatedBeds';
import AllocatedMeds from './components/dashboard/AllocatedMeds';
import Inventory from './components/dashboard/Inventory';
import PrivateRoute from './components/routing/PrivateRoute';
import NotFound from './components/layout/NotFound'
if(localStorage.token){
  setAuthToken(localStorage.token);
}

const App=()=> {
  //replicating componentDidMount method
  useEffect(()=>{
    store.dispatch(loadUser());
  },[]);

  return (
    <Provider store={store}>
    <Router>
    <ToastContainer/>
    <Navbar/>
      <Routes>
        <Route path={'/'} element={<Home />} />
      
        <Route path={'/dashboard'} element={
          <PrivateRoute><Dashboard /> </PrivateRoute>} />
       

       
        <Route path={'/dashboard/viewinventory'} element={ <PrivateRoute>
          <Inventory/> </PrivateRoute> } />
       
       
    
        <Route path={'/dashboard/addbed'} element={    <PrivateRoute>
          <Addbeditem/> </PrivateRoute> } />
       
       
        <Route path={'/dashboard/removebed'} element={ <PrivateRoute>
          <Removebeditem/> </PrivateRoute> } />
       
       
        <Route path={'/dashboard/allocatedbeds'} element={ <PrivateRoute>
          <AllocatedBeds/> </PrivateRoute> } />
       

       
        <Route path={'/dashboard/additem'} element={ <PrivateRoute>
          <Additem/> </PrivateRoute> } />
       
      
        <Route path={'/dashboard/removeitem'} element={  <PrivateRoute>
          <Removeitem/>    </PrivateRoute> } />
    
       
        <Route path={'/dashboard/allocatedmeds'} element={ <PrivateRoute>
          <AllocatedMeds/> </PrivateRoute> } />
       
      
       
        <Route path={'/auth/login'} element={<Login />} />
        <Route path={'/auth/register'} element={<Register />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
  </Router>
    </Provider>
  );
}

export default App;
