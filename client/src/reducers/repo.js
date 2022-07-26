import { FaGalacticSenate } from "react-icons/fa";
import { SET_INFO,SEARCH_INFO,SET_LEGIT,SEARCH_LEGIT,SET_SENSITIVE,SEARCH_SENSITIVE,SET_PYPI,SEARCH_PYPI, SET_NPM,SEARCH_NPM } from "../actions/types";
const initialState= {
    loading1: false,
    loading2: false,
    loading3: false,
    loading4: false,
    loading5: false,
    info: null,
    legit:null,
    sensitive:null,
    pypi:null,
    npm:null
}

function repo (state = initialState , action){
    const {type , payload} = action;
    switch(type){
        case SET_INFO :
            return {
                ...state,
                loading1:false,
                info:payload
            }
        case SEARCH_INFO:
            return {
                ...state,
                loading1:true,
                info:null
            }
        case SET_LEGIT :
            return {
                ...state,
                loading2:false,
                legit:payload
            }
        case SEARCH_LEGIT:
            return {
                ...state,
                loading2:true,
                legit:null
            }
        case SET_SENSITIVE :
            return {
                ...state,
                loading3:false,
                sensitive:payload
            }
        case SEARCH_SENSITIVE:
            return {
                ...state,
                loading3:true,
                sensitive:null
            }
        case SET_PYPI :
            return {
                ...state,
                loading4:false,
                pypi:payload
            }
        case SEARCH_PYPI:
            return {
                ...state,
                loading4:true,
                pypi:null
            }
        case SET_NPM :
            return {
                ...state,
                loading5:false,
                npm:payload
            }
        case SEARCH_NPM:
            return {
                ...state,
                loading5:true,
                npm:null
            }
        default:
            return state;
    }
}
export default repo;