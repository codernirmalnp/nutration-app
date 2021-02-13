
import {ITEM_LIST_REQUEST,ITEM_LIST_SUCCESS,ITEM_LIST_FAIL} from '../constants/diet'
export const dietReducer=(state={food:'',error:'',loading:false},action)=>
{
    switch(action.type)
    {
        case ITEM_LIST_REQUEST:
            return {loading:true}
        case ITEM_LIST_SUCCESS:
            return {loading:false,food:action.payload}
        case ITEM_LIST_FAIL:
            return {loading:false,error:action.payload}

        default:
            return state


    }

}