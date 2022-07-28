import { FaGalacticSenate } from "react-icons/fa";
import { SET_INFO,SEARCH_INFO,SET_LEGIT,SEARCH_LEGIT,SET_SENSITIVE,SEARCH_SENSITIVE,SET_PYPI,SEARCH_PYPI, SET_NPM,SEARCH_NPM } from "../actions/types";
const initialState= {
    loading: false,
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
                loading:false,
                info:payload
            }
        case SEARCH_INFO:
            return {
                ...state,
                loading:true,
                info:null
            }
        case SET_LEGIT :
            return {
                ...state,
                loading:false,
                legit:payload
            }
        case SEARCH_LEGIT:
            return {
                ...state,
                loading:true,
                legit:null
            }
        case SET_SENSITIVE :
            return {
                ...state,
                loading:false,
                sensitive:payload
            }
        case SEARCH_SENSITIVE:
            return {
                ...state,
                loading:true,
                sensitive:null
            }
        case SET_PYPI :
            return {
                ...state,
                loading:false,
                pypi:payload
            }
        case SEARCH_PYPI:
            return {
                ...state,
                loading:true,
                pypi:null
            }
        case SET_NPM :
            return {
                ...state,
                loading:false,
                npm:payload
            }
        case SEARCH_NPM:
            return {
                ...state,
                loading:true,
                npm:null
            }
        default:
            return state;
    }
}
export default repo;