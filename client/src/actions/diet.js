import api from '../api'
import {DETAIL_ITEM_REQUEST,DETAIL_ITEM_SUCCESS,DETAIL_ITEM_FAIL,ITEM_LIST_REQUEST,ITEM_LIST_SUCCESS,ITEM_LIST_FAIL,REMOVE_ITEM_REQUEST,REMOVE_ITEM_SUCCESS,REMOVE_ITEM_FAIL} from '../constants/diet'

export const listItems=(page=1,search='')=>async (dispatch)=>{
    dispatch({
        type:ITEM_LIST_REQUEST
    });
    try{

        const { data } = await api.get('/item?page='+page+'&search='+search );
        console.log(data)
         
        dispatch({type:ITEM_LIST_SUCCESS,payload:data})
    }
    catch(e)
    {
      dispatch({type:ITEM_LIST_FAIL,payload:e.response && e.response.data.message ? e.response.data.message:e.message})
    }

}
export const removeItem=(id)=>async (dispatch)=>{
    dispatch({
        type:REMOVE_ITEM_REQUEST
    })
    try{
        const {data}=await api.delete('/item/'+id)
        dispatch({type:REMOVE_ITEM_SUCCESS,payload:data})


    }
    catch(e)
    {
        dispatch({type:REMOVE_ITEM_FAIL,payload:e.response && e.response.data.message ? e.response.data.message:e.message})
    }


}
export const detailsItem=(productId)=>async (dispatch)=>{
    dispatch({type:DETAIL_ITEM_REQUEST,payload:productId})
    try{
        const {data}=await api.get('')
        dispatch({type:DETAIL_ITEM_SUCCESS,payload:data})
    }
    catch(e)
    {
        dispatch({type:DETAIL_ITEM_FAIL,payload:e.message})
    }
}