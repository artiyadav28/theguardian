import axios from "axios";
import showToast from "../utils/showToastNotification";

export const getAllMedicines = () => async (dispatch) =>{
    
    try{
       dispatch({
        type: 'RESET_STORES',
       })
        const medicines = await axios.get('/api/search/getAllMedicine')
        dispatch({
            type: 'GET_LIST',
            payload: medicines.data.map(item=>item.name)
        })
    }catch(e){
         console.log(e)
    }
}

export const findMedicines = (formData) => async (dispatch) =>{
    const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
    
      const body = JSON.stringify(formData);
    
    try{
      dispatch({
        type: 'FIND_STORES',
        payload: 'Medical Stores'
      })
        const list = await axios.post('/api/search/searchItem',body,config)
        dispatch({
            type: 'GET_STORES',
            payload: list.data
        })
    }catch(e){
         console.log(e)
         showToast("ERROR",e.response?.data?.msg || e.response?.data?.message);

    }
}

export const findBeds = (formData) => async (dispatch) =>{
    const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
    
      const body = JSON.stringify(formData);
    
    try{
        dispatch({
          type: 'FIND_STORES',
          payload: 'Hospitals'
        })
        const list = await axios.post('/api/search/searchBed',body,config)
        dispatch({
            type: 'GET_STORES',
            payload: list.data
        })
    }catch(e){
         console.log(e)
         showToast("ERROR",e.response?.data?.msg || e.response?.data?.message);
    }
}