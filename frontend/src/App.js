import './App.css';
import NavBar from './Components/NavBar/NavBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Comprar from './Pages/Comprar.jsx';
import ComprarCategorias from './Pages/ComprarCategorias.jsx'
import Producto from './Pages/Producto.jsx'
import Cart from './Pages/Cart.jsx'
import LoginSignup from './Pages//LoginSignup.jsx'
import Footer from './Components/Footer/Footer.jsx'
import banner_mujer from './Components/Assets/banner_mujer.webp';
import bannerMen from './Components/Assets/bannerMen.jpg'
import banner_kidsRayBan from  './Components/Assets/banner_kidsRayBan.jpg'

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<Comprar />} />

          <Route path='/mujer' element={<ComprarCategorias banner={banner_mujer} category='women'/> } /> 
          <Route path='/hombre' element={<ComprarCategorias banner={bannerMen} category='men' />} />
          <Route path='/niños' element={<ComprarCategorias banner={banner_kidsRayBan}category='kids'/>} /> 
          <Route path='/producto' element={<Producto />}>
            <Route path=':productoId' element={<Producto />} />
          </Route>
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<LoginSignup />} />


        </Routes>
        <Footer />
      </BrowserRouter>

    </div>
  );
}

export default App;
