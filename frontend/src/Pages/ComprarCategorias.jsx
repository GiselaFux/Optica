import React, { useContext } from 'react';
import './css/ComprarCategorias.css'
import { ComprarContext } from '../Context/ComprarContext.jsx'
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import Item from '../Components/Item/Item.jsx'

const ComprarCategorias = (props) => {
   console.log(props)
   const { all_product } = useContext(ComprarContext)
   return (
      <div className='comprar-categorias'>
         <img className='banner' src={props.banner} alt='imagenes' />
         <div className="comprarCategorias-indexSort">
            <p>
               <span>Mostrar 1-12</span>de 36 productos
            </p>
            <div className="comprarCategoria-sort">
               Ordenar por <img src={dropdown_icon} alt='dropdown' />
            </div>
         </div>

         <div className="comprarCategorias-productos">
             {
             all_product.map((item, i) => {
               if (props.category === item.category) {
                  return <Item key={i} id={item.id} name={item.name} category={item.category} image={item.image} new_price={item.new_price} old_price={item.old_price} />
              } 
               else {
                  return null;
               }
            })} 


         </div>
         <div className="comprarCategorias-loadmore">
            Ver más...
         </div>

      </div>
   )
}
export default ComprarCategorias;