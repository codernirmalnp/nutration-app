import React,{useState} from 'react'
import Cookies from 'js-cookie';
import api from '../api'
import {useHistory,Link} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {addItem} from '../actions/item'


function Dashboard(){
  const dispatch=useDispatch();
  const history=useHistory();
  const [preview,setPreview]=useState()
  const [item,setItem]=useState({fat:'',protein:'',carbohydrate:'',itemName:''})
  const [image,setImage]=useState([])
  const [message,setMessage]=useState();
 
  const ImageHandler=(e)=>{
 
   

    setPreview( URL.createObjectURL(e.target.files[0]))
    setImage(e.target.files[0])

  }
  const changeHandler=(e)=>{
    setItem({...item,[e.target.name]:e.target.value})

  }
  
  async function logout(){
    
    const {data}=await api.post('/logout')
    setMessage(data.message)
    localStorage.removeItem("userInfo")
    Cookies.remove("expiresAt")
    setTimeout(()=>{
      history.push('/')

    },2000);  

  }

  const onFormSubmit=(e)=>{
    e.preventDefault();
 
 
      const data = new FormData();
      data.append("image", image);
      for (const [key,value] of Object.entries(item))
      {
        data.append([key],value)
      }

    dispatch(addItem(data))
    setItem('')
    setImage('')
   
    
  }
  
    return (
       <>
      <div className="flex justify-around">
      <a onClick={logout} href="/#" className="border-b border-green-700 mx-50 cursor-pointer">Logout</a>
      <Link to='/item' className="text-blue-600">Item</Link>
     
      </div>
      <span className="text-green-500 text-bold">{message}</span>
      <form onSubmit={onFormSubmit} encType="multipart/form-data">
  <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
  <div className="-mx-3 md:flex mb-6">
    <div className="md:w-1/2 px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" >
        Item Name
      </label>
      <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3" id="grid-first-name" type="text" name="itemName" step="0.01" onChange={changeHandler} placeholder="Banana"/>
    </div>
    <div className="md:w-1/2 px-3">
      <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" >
        Fat
      </label>
      <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="grid-last-name" type="number" step="0.01" name="fat" onChange={changeHandler} placeholder="20g"/>
    </div>
  </div>
  <div className="-mx-3 md:flex mb-6">
    <div className="md:w-full px-3">
      <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" >
        Protein
      </label>
      <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4 mb-3" id="grid-password" type="number" step="0.01" placeholder="10g" onChange={changeHandler} name="protein"/>
     
    </div>
  </div>

    <div className="md:w-1/2 px-3">
      <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" >
        Carbohydrate
      </label>
      <input className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4" id="grid-zip" type="number" name="carbohydrate" step="0.01" placeholder="50g" onChange={changeHandler}/>
    </div>
   
   
    <div className="md:w-1/2 px-3 mt-4">
      <label className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2" >
        Image Upload
        <img src={preview}  alt="preview" className="h-10 w-10 mb-2"/>
      
      </label>
      <input type="file" name="image-upload" id="input" accept="image/*" onChange={ImageHandler}/>
    </div>
    <button type="submit" className="bg-red-700 mt-5 p-2 text-white">Add</button>

  </div>
  
  </form>


    </>
     
    )

}
export default Dashboard;