import React from 'react'
const Pagination=({totalPage,nextPage,previousPage,currentPage,getPage})=>{
    function changePage(e)
    {
        e.preventDefault();
        getPage(e.target.value)
      
    }
  return(
    <>
    <ul className="flex  flex-col-2 gap-4 justify-center m-2">
    {previousPage && <li className=" bg-black w-20 text-center text-white text-md  p-2 cursor-pointer"  value={previousPage.page} onClick={changePage} >Previous </li>}
    {[...Array(totalPage).keys()].map(
                                (x) => (
                                  <li className=" bg-black w-20 text-center text-white text-md  p-2 cursor-pointer" key={x + 1} value={x + 1} onClick={changePage}>
                                    {x+1}
                                  </li>
                                )
                              )}
                               {nextPage && <li className=" bg-black w-20 text-center text-white text-md  p-2 cursor-pointer"  value={nextPage.page} onClick={changePage} >Next</li>}
     </ul>
    </>

  ) 
}
export default Pagination;