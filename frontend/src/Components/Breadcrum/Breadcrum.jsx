import React from 'react'
import './Breadcrum.css'
import arrow_icon from '../Assets/breadcrum_arrow.png'

export const  Breadcrum= (props) => {
  const {product}=props
  return (
    <div className='breadcrum'>
    HOME <img src={arrow_icon}alt='arrow icon' /> COMPRAR <img src={arrow_icon} alt="arrow-icon" /> {product.category} <img src={arrow_icon} alt="arrow icon" /> {product.name}
    </div>
  )
}
