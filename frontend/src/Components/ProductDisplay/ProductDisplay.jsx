import React from 'react'
import './ProductDisplay.css';
import star_icon from '../Assets/star_icon.png';
import star_dull_icon from '../Assets/star_dull_icon.png'
import { useContext }from 'react';
import { ComprarContext } from '../../Context/ComprarContext';



export const ProductDisplay = (props) => {
   const { product } = props;
   //agrego la funcionalidad de agregar al carrito que escrinimos en ComprarContext
   const {addToCart} =useContext(ComprarContext)
   return (
      <div className='productDisplay'>
         <div className='productdisplay-left'>
            <div className="prductdisplay_img-list">
               <img src={product.image} alt='' />
               <img src={product.image} alt='' />
               <img src={product.image} alt='' />
               <img src={product.image} alt='' />
            </div>
            <div className="productdisplay-img">
               <img src={product.image} alt="" className="productdisplay-main-img" />
            </div>
         </div>
         <div className="productdisplay-right">
            <h1>{product.name}</h1>
            <div className="productdisplay-right-star">
               <img src={star_icon} alt="estrella" />
               <img src={star_icon} alt="estrella" />
               <img src={star_icon} alt="estrella" />
               <img src={star_icon} alt="estrella" />
               <img src={star_dull_icon} alt="estrella gris" />
               <p>(102)</p>
            </div>
            <div className="productdisplay-right-prices">
               <div className="productdisplay-right-price-old">
                  ${product.old_price}
               </div>
               <div className="productdisplay-right-price-new">
                  ${product.new_price}
               </div>

            </div>
            <div className="productdisplay-right-description">
               Increibles lentes livianos y resistentes.Garantía 12 meses.
            </div>
            <div className="productdisplay-right-size">
               <h1>Seleccione el talle:</h1>
               <div className="productdisplay-rigth-sizes">
                  <div>XS</div>
                  <div>S</div>
                  <div>M</div>
                  <div>L</div>
                  <div>XL</div>
               </div>
            </div>
            {/* agrego la funcion addToCart */}
            <button onClick={()=>{addToCart(product.id)}} >Agregar al carro</button>
            <p className="productdisplay-right-category">
               <span>Categoría :</span> Mujer. Anteojos RayBan.
            </p>
            <p className="productdisplay-right-category">
               <span>Tags :</span> Moderno Clasico.
            </p>
         </div>
      </div>
   )
}
