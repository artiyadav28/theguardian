import axios from "axios";

export const getRepoDetails = (url) => async (dispatch) => {
    try{
        dispatch({
         type: 'SEARCH_INFO',
        })
        console.log(url);
        // const options = {
        //     method: 'post',
        //     url: '/getinfo',
        //     data: {
        //         url:url
        //     }
        //   };
         const res = await axios.post('/getinfo',{url:url})
        // const res=await axios(options);
         const result=res.data.replace(/'/g, '"')
        //  console.log(result);
         const info=JSON.parse(result);

        //  console.log(res.data);
        //  console.log(typeof res.data);
        // console.log(info);
        // console.log(typeof info);
         dispatch({
             type: 'SET_INFO',
             payload: info
         })
     }catch(e){
          console.log(e)
     }
};
