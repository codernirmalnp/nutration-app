import {LOGIN_REQUEST,LOGIN_SUCCESS,LOGIN_FAIL} from '../constants/login'
export const LoginReducer=(state={user:'',error:'',loading:false},action)=>{
switch(action.type)
{
    case LOGIN_REQUEST:
        return {loading:true}
    case LOGIN_SUCCESS:
        return {loading:false,user:action.payload}
    case LOGIN_FAIL:
        return {loading:false,error:action.payload}
    default:
        return state;

}
}