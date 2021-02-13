import React from 'react'
import {useDispatch} from 'react-redux'
import {removeItem} from '../actions/diet.js'

export const ListItem=({item,getId})=>{
 
 const dispatch=useDispatch();
 

  const  deleteItem=(e)=>{

    dispatch(removeItem(e.target.value))
    getId(e.target.value)
  
  }



 
    return(
        <>
        
        <tbody>
    <tr className="bg-white border-4 border-gray-200">
      <td className="px-16 py-2 flex flex-row items-center">
        <img
          className="h-20 w-20 rounded-full object-cover "
          src={`https://nutrationapp.herokuapp.com//uploads/${item.image}`}
          alt=""
        />
      </td>
      <td>
        <span className="text-center ml-2 font-semibold">{item.itemName}</span>
      </td>
      <td className="px-16 py-2">
        <button className="bg-red-500 text-white px-4 py-2 border rounded-md hover:bg-white hover:border-indigo-500 hover:text-black " value={item._id} onClick={deleteItem}>
          Delete Item
        </button>
      </td>
      <td className="px-16 py-2">
        <span>{item.protein}</span>
      </td>
      <td className="px-16 py-2">
        <span>{item.fat}</span>
      </td>

      <td className="px-16 py-2">
        <span className="text-green-500">
          {item.carbohydrate}
        </span>
      </td>
    </tr>
    </tbody>
   
    </>
   
     
   

      
   

    )
}

 
