import React,{useState,useEffect} from 'react'
import {Login} from '../actions/login'
import {useSelector,useDispatch} from 'react-redux'


export default function LoginScreen(props){
     const userSignIn=useSelector(state=>state.Login)
     const {user,error}=userSignIn
     let message= user ?user['message']:null

     useEffect(()=>{
        if (user) {
            setTimeout(() => {
            props.history.push('/dashboard');
      
            },2000)
          }
          return () => {
            
          };
     },[user,props.history])
     const [formData,setFormData]=useState({email:'',password:''});

     const dispatch =useDispatch();
     const handelChange=(e)=>{
         setFormData({...formData,[e.target.name]:e.target.value})
         
     }
     const signIn=(e)=>{
         e.preventDefault();
         dispatch(Login(formData))
    

     }
 

   
  
   return (

    <div className="container  mx-auto flex flex-col items-center my-10">
      {error  && <span className="text-red-700 font-bold">{error}</span>}
      {message && <span className="text-green-700 font-bold">{message}</span>}
      <form onSubmit={signIn} className="shadow-lg w-2/3 md:w-1/3 p-4 flex flex-col bg-white rounded-lg">
      <input type="text" name="email" placeholder="Email" className="mb-3 py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-cyan-500"  onChange={handelChange}/>
      <input type="password"  name="password" placeholder="Pasword" className="mb-3 py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-cyan-500"  onChange={handelChange}/>
      <button  type="submit" className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold text-lg">Login</button>
      <hr />
      
    </form>
    </div>
  );
}

