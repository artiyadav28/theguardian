import axios from "axios";

export const getRepoVersionDetails = (url) => async (dispatch) => {
    try{
        dispatch({
         type: 'SEARCH_INFO',
        })

         const res = await axios.post('/versionChecker',{url:url})
        //  const result=res.data.replace(/'/g, '"')
        //  const info=JSON.parse(result);
         console.log(res.data);
         dispatch({
             type: 'SET_INFO',
             payload: res.data
         })
     }catch(e){
          console.log(e)
     }
};
export const getRepoLegitPercentDetails = (url) => async (dispatch) => {
    try{
        dispatch({
         type: 'SEARCH_LEGIT',
        })
         const res = await axios.post('/legitPercent',{url:url})
        //  const result=res.data.replace(/'/g, '"')
        //  const info=JSON.parse(result);
        //  console.log(typeof res.data);
        //  console.log(res.data);
         dispatch({
             type: 'SET_LEGIT',
             payload: res.data
         })
     }catch(e){
          console.log(e)
     }
};

export const getSensitiveInfoDetails = (url) => async (dispatch) => {
    try{
        dispatch({
         type: 'SEARCH_SENSITIVE',
        })
         const res = await axios.post('/sensitiveinfo',{url:url})
        //  const result=res.data.replace(/'/g, '"')
        //  const info=JSON.parse(result);
        //  console.log(typeof res.data);
        //  console.log(res.data);
         dispatch({
             type: 'SET_SENSITIVE',
             payload: res.data
         })
     }catch(e){
          console.log(e)
     }
};
