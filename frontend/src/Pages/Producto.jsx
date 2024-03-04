import React, { useContext } from 'react';
import './css/Producto.css'
import {ComprarContext} from '../Context/ComprarContext.jsx';
import {useParams} from 'react-router-dom';
import { Breadcrum } from '../Components/Breadcrum/Breadcrum.jsx';
import { ProductDisplay } from '../Components/ProductDisplay/ProductDisplay.jsx';
import { DescriptionBox } from '../Components/DescriptionBox/DescriptionBox.jsx';
import { RelatedProducts } from '../Components/RelatedProducts/RelatedProducts.jsx';

const Productos=()=>{
const {all_product}=useContext(ComprarContext);
const {productoId}= useParams();
const product= all_product.find((e)=> e.id=== Number(productoId))

   return(
      <div className='producto'>
<Breadcrum  product={product}/>
<ProductDisplay product={product}/>
<DescriptionBox />
<RelatedProducts />

      </div>
   )
}

export default Productos;