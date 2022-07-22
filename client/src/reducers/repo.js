import { FaGalacticSenate } from "react-icons/fa";
import { SET_INFO } from "../actions/types";
import { SEARCH_INFO } from "../actions/types";
const initialState= {
    loading: false,
    info: null,
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
        default:
            return state;
    }
}
export default repo;