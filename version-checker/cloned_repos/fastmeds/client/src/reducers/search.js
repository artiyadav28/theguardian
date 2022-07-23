import { GET_LIST } from "../actions/types";

const initialState= {
    
    loading: true,
    medicines: [],
}

function search (state = initialState , action){
    const {type , payload} = action;
    switch(type){
        case GET_LIST :
            return {
                ...state,
                loading:false,
                medicines: payload
            }
       
        default:
            return state;
    }
}
export default search;