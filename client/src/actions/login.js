import api from '../api'
import Cookie from 'js-cookie';
import {LOGIN_REQUEST,LOGIN_SUCCESS,LOGIN_FAIL} from '../constants/login'
export const Login=(payload)=>async (dispatch)=>{
    dispatch({type:LOGIN_REQUEST,payload:payload})
    try{
        const {data}=await api.post('/authenticate',payload)
        dispatch({type:LOGIN_SUCCESS,payload:data})
        localStorage.setItem('userInfo',JSON.stringify(data.userInfo))
        Cookie.set('expiresAt',data.expiresAt,{sameSite:true})
    }
    catch(e)
    {
        dispatch({type:LOGIN_FAIL,payload:e.response && e.response.data.message ? e.response.data.message:e.message})
    }

}

