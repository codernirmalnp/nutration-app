import React,{useEffect,useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {listItems} from './actions/diet'
import ItemCard from './components/itemCard'
import Pagination from './components/Pagination'
import ItemSearch from './components/itemSearch'
const Home=()=>{
  const items=useSelector(state=>state.Diet)
  const [page,setPage]=useState()
  const {food}=items

  const [search,setSearch]=useState();
  const dispatch=useDispatch();
 useEffect(()=>{
   const fetchData=async ()=>{
     
      dispatch(listItems(page,search))
     
   }
   fetchData();
 },[dispatch,page,search])
 const  getPage=(data)=>{
  setPage(data)


  }

  return (
    <>
    <ItemSearch  searchText={(text) => setSearch(text)}/>
    <div className="container mx-auto md:grid md:grid-col-1 md:grid-cols-3">
        { food ? food.data.map((item,index)=>{
             
           
             return <ItemCard item={item}  index={index} key={index}  />
    
           })
         
     
     :<h3>Loading...</h3>}
    
    </div>
    {food && <Pagination previousPage={food.previous} nextPage={food.next} totalPage={food.totalPage} currentPage={food.currentPage} getPage={getPage}/> }
    </>

    );

}
export default Home;