import axios from "axios";

//if token if there add a global header of x-auth-token
//so if user is logged in we send this with every request
const setAuthToken = token =>{
    if(token){
        axios.defaults.headers.common['x-auth-token']= token;
    }else{
        delete axios.defaults.headers.common['x-auth-token'];
    }
}

export default setAuthToken;