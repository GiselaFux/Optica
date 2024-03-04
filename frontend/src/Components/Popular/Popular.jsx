import './Popular.css';
import React from 'react';
/* import data_product from '../Assets/data1.js'; */
import Item from '../Item/Item.jsx';
import { useState, useEffect } from 'react';

export default function Popular() {
/* hooks */
const[populalProducts, setPopularProducts]=useState([])

useEffect(()=>{
fetch('http://localhost:4000/popularinwomen')
.then((response)=> response.json())
.then((data)=>setPopularProducts(data))
},[])


  return (
   <div className='popular'>
<h1>MAS CONSULTADOS PARA MUJERES:</h1>
<hr/>
<div className='popular-item'>
   {/* data_product */populalProducts.map((item,i)=>{
      return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
   })}
</div>


   </div>
  )
}