import './Item.css'
import React from 'react'
import{ Link } from 'react-router-dom'

export default function Item(props) {
  return (
    <div className='item'>
      <Link to={`/producto/${props.id}`}><img onClick= {window.scrollTo(0,0)} src={props.image}  alt='imagenes de productos' /></Link>
      <p>{props.name}</p>
      <div className='item-prices'>
        <div className='item-price-new'>
          ${props.new_price}
        </div>
        <div className='item-old-price'>
          ${props.old_price}
        </div>
      </div>
    </div>
  )
}