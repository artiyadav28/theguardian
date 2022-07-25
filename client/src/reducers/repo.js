import { FaGalacticSenate } from "react-icons/fa";
import { SET_INFO,SEARCH_INFO,SET_LEGIT,SEARCH_LEGIT  } from "../actions/types";
const initialState= {
    loading: false,
    info: null,
    legit:null
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
        default:
            return state;
    }
}
export default repo;