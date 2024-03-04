/* import React from 'react' */
import './navbar.css';
import navlogo from '../../assets/logo.png'
import navProfile from '../../assets/nav-profile.svg'

const Navbar = () => {
  return (
    <div className='navbar'>
      <img src={navlogo} alt="logo del nav" className="nav-logo" />
      <p>Panel de Administración</p>
      <img src={navProfile} alt="perfil-nav" className='nav-profile' />
    </div>
  )
}

export default Navbar;