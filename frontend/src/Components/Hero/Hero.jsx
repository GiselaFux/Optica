import './Hero.css'
import React from 'react'
import hand_icon from '../Assets/hand_icon.png'
import arrow_icon from '../Assets/arrow.png'
import hero_image from '../Assets/hero_image.png'


export default function Hero() {
  return (
    <div className='hero'>
      <div className="hero-left">
        <h2>NEW SEASONS</h2>
        <div className='hero-hand-icon'>
          <p>Nuevos Arrivos</p>
          <img src={hand_icon} alt='icono de una manito' />
        </div>
        <p>Modelos para todos</p>
     
      <div className='hero-latest-btn'>
        <div>Últimos ingresos...</div>
        <img src={arrow_icon} alt='' />
        <div>

        </div>
         </div>
      </div>
      <div className="hero-right">
        <img src={hero_image} alt='imagen' />
      </div>
    </div>
  )
}