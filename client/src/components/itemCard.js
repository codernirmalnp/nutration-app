import React from 'react';
import {Link} from  'react-router-dom'

const ItemCard = ({ item }) => {


  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <Link to={`product/${item._id}`}>
      <img src={`https://nutrationapp.herokuapp.com//uploads/${item.image}`} alt="" className="w-300 h-300 overflow-hidden"/>
      </Link>
      
      <div className="px-6 py-4">
        <div className="font-bold text-purple-500 text-xl mb-2">
         {item.itemName}
        </div>
        <ul>
          <li>
            <strong>Fat: </strong>
            {item.fat}
          </li>
          <li>
            <strong>Carbohydrate: </strong>
            {item.carbohydrate}
          </li>
          <li>
            <strong>Protein: </strong>
            {item.protein}
          </li>
        </ul>
      </div>
     
    </div>
  )
}

export default ItemCard;
