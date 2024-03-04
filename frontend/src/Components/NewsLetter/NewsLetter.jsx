import React from 'react'
import './NewsLetter.css'


 const NewsLetter = () => {
  return (
    <div  className='newsLetter'>
      <h1>Obten exclusivas ofertas en tu Email</h1>
      <p>Suscríbete a nuestro correo y manténte informada</p>
      <div className="dos"> 
         <input type='email' placeholder='Tu Email' />
         <button>Suscríbete</button>
      </div>

    </div>
  )
}
export default NewsLetter;
