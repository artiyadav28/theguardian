import axios from "axios";

export const getRepoVersionDetails = (url) => async (dispatch) => {
    try{
        dispatch({
         type: 'SEARCH_INFO',
        })

         const res = await axios.post('/git',{url:url})
        //  const result=res.data.replace(/'/g, '"')
        //  const info=JSON.parse(result);
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
         const res = await axios.post('/trustscore',{url:url})
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
         dispatch({
             type: 'SET_SENSITIVE',
             payload: res.data
         })
     }catch(e){
          console.log(e)
     }
};

export const getPypiDetails = (url) => async (dispatch) => {
    try{
        dispatch({
         type: 'SEARCH_PYPI',
        })
         const res = await axios.post('/pypi',{url:url})
         dispatch({
             type: 'SET_PYPI',
             payload: res.data
         })
     }catch(e){
          console.log(e)
     }
};
export const getNpmDetails = (url) => async (dispatch) => {
    try{
        dispatch({
         type: 'SEARCH_NPM',
        })

         const res = await axios.post('/npm',{url:url})
        //  const result=res.data.replace(/'/g, '"')
        //  const info=JSON.parse(result);
         dispatch({
             type: 'SET_NPM',
             payload: res.data
         })
     }catch(e){
          console.log(e)
     }
};