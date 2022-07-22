import axios from "axios";

export const getRepoDetails = () => async (dispatch) => {
    try{
        dispatch({
         type: 'SEARCH_INFO',
        })
         const info = await axios.get('/getinfo')
         dispatch({
             type: 'SET_INFO',
             payload: info.data
         })
     }catch(e){
          console.log(e)
     }
};
