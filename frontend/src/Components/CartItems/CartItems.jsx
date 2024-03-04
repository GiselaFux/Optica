import React,  { useContext, useState } from 'react'
import './CartItems.css'
/* import from 'react'; */
import { ComprarContext } from '../../Context/ComprarContext'
import remove_icon from '../Assets/cart_cross_icon.png'
import axios from "axios";

/* AGREGO LOS PEDIDOS DE MERCADO PAGO */
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'

 const CartItems = () => {

const [preferenceId, setPreferenceId]=useState(null)

   /* INICIALIZAMOS CON EL PUBLIC KEY QUE NOS DA MERCADO PAGO */
initMercadoPago('TEST-ade97dbc-16d1-4656-bddb-46816fa9065f',{
   locale: 'es-AR'
}); 

const createPreference=async()=>{
   try{
      const response = await axios.post('http://localhost:4000/create_preference',
      { 
         id: 58,
         name:'RayBan Modelo RB33447v2503',
          image:'http://localhost:4000/images/product_1707017520685.jpg',
         category:"men",
          currency_id: "ARS",
         cartData: 1,
         new_price: 188000
    });
    
   const {id}=response.data
return id;

}catch (error){
   console.log(error)
}
};

const handleBuy= async()=>{
   const id = await createPreference();
   if(id){
      setPreferenceId(id)
   }
}

   const { all_product, cartItems, removeFromCart,getTotalCartAmount} = useContext(ComprarContext)
   return (
      <div className='cartitems'>
         <div className="cartitems-format-main">
            <p>Producto </p>
            <p>Título</p>
            <p> Precio</p>
            <p>Cantidad</p>
            <p>Total </p>
            <p>Eliminar</p>
         </div>
         <hr className='arriba'/>

         {all_product.map((e) => {
            if (cartItems[e.id] > 0) {
               return <div>
                  <div className="cartitems-format cartitems-format-main">
                     <img src={e.image} alt="" className="carticon-product-icon" />
                     <p>{e.name}</p>
                     <p>$ {e.new_price}</p>
                     <button className="cartitems-quantity">{cartItems[e.id]}</button>
                     {/* multiplica el precio por el numero de la cantidad de eventos(id)*/}
                     <p> $ {e.new_price *cartItems[e.id]}</p>
                     <img className='icon' src={remove_icon} onClick={() => { removeFromCart(e.id) }} alt="" />
                  </div>
                  <hr className='arriba' />
               </div>
            }
            return null;
         })}
         <div className="catitems-down">
            <div className="cartitems-total">
               <h1>Total del Carro</h1>
               <div>
                  <div className="cartitems-total-item">
                     <p>Subtotal</p>
                     <p>${getTotalCartAmount()}</p>
                  </div>
                  <hr className='bajo'/>
                  <div className="cartitems-total-item">
                     <p>Costo de envío</p>
                     <p>Envío gratis</p>
                  </div>
                  <hr className='bajo'/>
                  <div className="cartitems-total-item">
                     <h3>Total</h3>
                     <h3>${getTotalCartAmount()}</h3>
                  </div>
               </div>
              <button onClick={handleBuy}>Concretar el pago</button>
              {/* LO QUE SERA EL BOTON  MP */}
           {preferenceId && <Wallet initialization={{preferenceId: preferenceId}} />}
            </div>
            <div className="cartitems-promocode">
               <p>Si tiene un código de promoción,por favor,ingréselo aquí</p>
               <div className="cartitems-promobox">
                  <input type="text" placeholder='Código de promoción'/>
                  <button>Enviar</button>
               </div>
            </div>
         </div>
      </div>
   )
}
export default CartItems;