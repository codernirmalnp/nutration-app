import React,{createContext} from 'react'
import {useSelector} from 'react-redux'
import Cookie from 'js-cookie'
const AuthContext=createContext()
const Provider=AuthContext

const AuthProvider=({children})=>{
   
    const authenticate=useSelector(state=>state.Login)
    const token= Cookie.get('token')
    const expiresAt=Cookie.get('expiresAt')
    const {user}=authenticate
    function isAuthenticated(){
        if(user["token"] || token &&   new Date().getTime() / 1000 < user["expiresAt"]  || expiresAt  )
        {
          return true;
        }
        return false;
    }

    return <Provider value={{isAuthenticated}}>
        {children}
    </Provider>
}
export default{AuthContext,AuthProvider}