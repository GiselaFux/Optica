import React from 'react'
import './Footer.css'
import Logo from'../Assets/Logo.png'
import instagram_icon from '../Assets/instagram_icon.png'
import whatsapp_icon from '../Assets/whatsapp_icon.png'

 const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-logo">
         <img src={Logo} alt='Logo'/>
         <p>Optica Estilo</p>
      </div>
      <ul className="footer-links">
         <li>Nosotros</li>
         <li>Ubicación</li>
         <li>Contacto</li>
      </ul>
      <div className="footer-social-icon">
         <div className="social-icon-container">
            <img src={instagram_icon} alt='Icon Instargram'/>
         </div>
         <div className="social-icon-container">
            <img src={whatsapp_icon} alt='Icon whatsapp'/>
         </div>
      </div>
      <div className="footer-copy-right">
         <hr />
         <p> Copyright @ 2024- All Right Reserved</p>
      </div>
    </div>
  )
}
export default Footer;