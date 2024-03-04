import React from 'react';
import{useState, useContext,useRef}from 'react';
 import { Link } from 'react-router-dom'; 
import './NavBar.css';
import Logo from '../Assets/Logo.png';
import cartIcon from '../Assets/cartIcon.png'
import {ComprarContext} from '../../Context/ComprarContext.jsx'
import dropdown_icon from '../Assets/dropdown_icon.png'


const NavBar = () => {

const [menu,setMenu]= useState("Comprar")
const{getTotalCartItems}=useContext(ComprarContext)
const menuRef=useRef();
/* const para el menu dropdown a la q agregamos  className */
const dropdown_toggle= (e) => {
menuRef.current.classList.toggle('nav-menu-visible')
e.target.classList.toggle('open');
}

   return (
      <div className='navbar'>
         <div className="nav-logo">
            <img src={Logo} alt="imagen del logo" />
            <p>Optica Estilo</p>
         </div>
         <img className='nav-dropdown' onClick={dropdown_toggle} src={dropdown_icon} alt="icon dropdown" />
         <ul ref={menuRef} className="nav-menu">
            <li onClick={()=>{setMenu('comprar')}}><Link style={{textDecoration:'none'}} to='/'>Comprar</Link>{menu==='comprar'?<hr />:<></>}</li>
            <li onClick={()=>{setMenu('mujer')} }><Link style={{textDecoration:'none'}} to='/mujer'>Mujer</Link>{menu==='mujer'?<hr />:<></>}</li>
            <li onClick={()=>{setMenu('hombre')}}><Link style={{textDecoration:'none'}} to='/hombre'>Hombre</Link>{menu==='hombre'?<hr />:<></>}</li>
            <li onClick={()=>{setMenu('niños')}} ><Link style={{textDecoration:'none'}} to='/niños'>Niños</Link>{menu==='niños'?<hr />:<></>}</li>
         </ul>

         <div className="nav-login-cart">
            {localStorage.getItem('auth-token')
            ?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Salir</button>
         :<Link to='/login'><button>Login</button></Link> }
           
           <Link to='/cart'><img src={cartIcon} width='30px' alt="imagen carrito compras" /></Link> 
         <div className='nav-cart-count'>{getTotalCartItems()}</div>
         </div>
      </div>
   )
}

export default NavBar;