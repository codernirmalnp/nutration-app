
import {ADD_ITEM_REQUEST,ADD_ITEM_SUCCESS,ADD_ITEM_FAIL} from '../constants/diet'
import api from '../api'
export const addItem=(payload)=>async(dispatch)=>{

    dispatch({type:ADD_ITEM_REQUEST,payload:payload})
    try{
        const {data}=await api.post('/item',payload)
        dispatch({type:ADD_ITEM_SUCCESS,payload:data})
        
    }
    catch(e)
    {
        dispatch({type:ADD_ITEM_FAIL,payload:e.response && e.response.data.message ? e.response.data.message:e.message})
    }
    

}