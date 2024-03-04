import React from 'react'
import './Offers.css'
import exclusive_image from '../Assets/exclusive_image.png'

  const Offers = () => {
  return (
    <div className='offers'>
    <div className="offers-left">
      <h1>Exclusivas</h1>
      <h1>Ofertas para tí</h1>
      <p>Solo nuestros mejores productos </p>
      <button>Míralos ahora</button>
    </div>
    <div className="offers-right">
      <img src={exclusive_image} alt='ofertas'/>
    </div>
    </div>
  )
}
export default Offers;

