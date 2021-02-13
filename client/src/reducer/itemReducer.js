import {ADD_ITEM_REQUEST,ADD_ITEM_SUCCESS,ADD_ITEM_FAIL,REMOVE_ITEM_SUCCESS,REMOVE_ITEM_FAIL, REMOVE_ITEM_REQUEST} from '../constants/diet'
export const itemReducer=(state={data:[],error:'',message:'',loading:false},action)=>
{
    switch(action.type)
    {
        case ADD_ITEM_REQUEST:
            return {loading:true}
        case ADD_ITEM_SUCCESS:
            return {loading:false,data:action.payload}
        case ADD_ITEM_FAIL:
            return {loading:false,data:action.payload}
       
        default:
            return state;
    }
}
export const itemRemover=(state={data:[],error:'',loading:false},action)=>{
    switch(action.type)
    {
        case REMOVE_ITEM_REQUEST:
            return {loading:true}
        case REMOVE_ITEM_SUCCESS:
            return {loading:false,data:action.payload}
        case REMOVE_ITEM_FAIL:
            return {loading:false,data:action.payload}
        default:
            return state;
  
    }
}


