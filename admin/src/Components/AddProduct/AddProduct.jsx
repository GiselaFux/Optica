/* import React from 'react' */
import { useState } from 'react';
import './AddProduct.css'
import upload__area from '../../assets/upload_area.svg'

const AddProduct = () => {
/* HOOKS usestate para imagen */
const [image,setImage]=useState(false);
/* para menjar la carga de la imagen ante un evento*/
const imageHandler=(e)=>{
setImage(e.target.files[0]);
}


/* HOOKS usestate para la informacion(old_price, new_price,title..etc) */
const [productDetails, setProductDetails]=useState({
   name:"",
   image:"",
   category:"women",
   old_price:"",
   new_price:""
})
/* para menjar la carga de la información ante un evento*/

const changeHandler=(e)=>{
   setProductDetails({...productDetails,[e.target.name]: e.target.value})
}


/* función para manejar el boton de add product */
const Add_Product=async()=>{
console.log(productDetails);
let responseData;
let product= productDetails;


let formData= new FormData();
formData.append('product',image);

await fetch('http://localhost:4000/upload',{
   method:'POST',
   headers:{
      Accept:'application/json',
   },
   body:formData,
}).then((resp)=>resp.json()).then((data)=>{responseData=data})
if(responseData.success)
{
   product.image=responseData.image_url;
   console.log(product)
   /* ahora enviaremos el roducto a nuestro endpoint */
   await fetch('http://localhost:4000/addproduct',{
   method:'POST',
   headers:{
      Accept:'application/json',
      'Content-Type':'application/json'
   },
   body:JSON.stringify(product)
}).then((resp)=>resp.json()).then((data)=>{
   data.success?alert('Producto agregado'): alert('fallo en agregar productoS')
})
}

}


   return (
      <div className='addProduct'>
         <div className="addproduct-itemfield">
            <p>Título del producto</p>
            <input  value={productDetails.name}  onChange={changeHandler} type='text' name='name' placeholder='Escribe aquí' />
         </div>
         <div className="addproduct-price">
            <div className="addproduct-itemfield">
               <p>Precio</p>
               <input value={productDetails.old_price} onChange={changeHandler} type="text" name='old_price' placeholder='escriba aquí' />
            </div>
            <div className="addproduct-itemfield">
               <p>Precio de oferta</p>
               <input value={productDetails.new_price} onChange={changeHandler} type="text" name='new_price' placeholder='escriba aquí' />
            </div>
         </div>
         <div className="addproduct-itemfield">
            <p>Categoría del producto</p>
            <select  value={productDetails.category} onChange={changeHandler} name="category" className='add-product-selector'>
               <option value="women">Mujeres</option>
               <option value="men">Hombres</option>
               <option value="kids">Niños</option>
            </select>
         </div>
         <div className="addproduct-itemfield">
<label htmlFor="file-input">
   {/* if the image is true, will display url.createObje.. if not useState will be false and will show the image upload_area */}
   <img src={image ? URL.createObjectURL(image): upload__area} alt="" className='addproduct-thumnail-img' />
</label>
<input onChange={imageHandler} type="file" name='image' id='file-input'  hidden/>
         </div>
         <button  onClick={()=> {Add_Product()}}className='addproduct-btn'>Agregar</button>
      </div>
   )
}

export default AddProduct;