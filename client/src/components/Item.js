import React,{useEffect,useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {listItems} from '../actions/diet.js'
import {ListItem} from './ListItem'
import Pagination from './Pagination'

import {Link } from 'react-router-dom'



function Item(){
  const [page,setPage]=useState()
  const [itemIndex,setItemIndex]=useState()
  const itemList=useSelector(state=>state.Diet)
  const {food}=itemList
  const dispatch=useDispatch();
  useEffect(()=>{

   async function fetchData(){
    dispatch(listItems(page))
   }
   fetchData();
  
     
   
  },[dispatch,page])
  const  getPage=(data)=>{
    setPage(data)
  
  
    }
    const getId=(data)=>{
      setItemIndex(data)
    }
 




    return (
      <div>
      <Link to='/dashboard' class="w-full flex justify-center text-orange-700">Dashboard</Link>
      <table className="min-w-full table-auto">
        <thead className="justify-between">
          <tr className="bg-gray-800">
            <th className="px-16 py-2">
              <span className="text-gray-300"></span>
            </th>
            <th className="px-16 py-2">
              <span className="text-gray-300">Name</span>
            </th>
            <th className="px-16 py-2">
              <span className="text-gray-300">Action</span>
            </th>
            <th className="px-16 py-2">
              <span className="text-gray-300">Protein</span>
            </th>
      
            <th className="px-16 py-2">
              <span className="text-gray-300">Fat</span>
            </th>
      
            <th className="px-16 py-2">
              <span className="text-gray-300">Carbohydrate</span>
            </th>
          </tr>
        </thead>
       
        {itemIndex ? food.data.filter((item)=>{
               return item._id !== itemIndex
        }).map((item,index)=>{
          return <ListItem item={item}   key={index} getId={getId} />

        }):food ? food.data.map((item,index)=>{
             
           
          return <ListItem item={item}   key={index} getId={getId} />
 
        }):<tbody><tr><td>Loading...</td></tr></tbody>}
       
          
          
      
     

  

   
      
    
</table>
{food && <Pagination previousPage={food.previous} nextPage={food.next} totalPage={food.totalPage} currentPage={food.currentPage} getPage={getPage}/> }

</div>
   
    )

}
export default Item;