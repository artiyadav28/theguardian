import { combineReducers } from "redux";
import alert from './alert';
import auth from './auth';
import search from './search'
import stores from './stores'
export default combineReducers({ 
    alert,
    auth,
    search,
    stores
});