import { GET_STORES, FIND_STORES, RESET_STORES } from "../actions/types";

const initialState= {
    
    finding: false,
    searchType: null,
    stores: null
}

function stores (state = initialState , action){
    const {type , payload} = action;
    switch(type){
        case FIND_STORES: 
        return {
            ...state,
            finding: true,
            searchType: payload,
            stores: null
        }
        case GET_STORES :
            return {
                ...state,
                finding:false,
                stores: payload
            }
       case RESET_STORES:
        return {
            finding:false,
            searchType:null,
            stores:null
        }
        default:
            return state;
    }
}
export default stores;