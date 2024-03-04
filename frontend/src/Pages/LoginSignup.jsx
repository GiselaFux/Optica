import './css/LoginSignup.css'
import React from 'react';
import { useState } from 'react';

export default function LoginSignup() {
/* hooks */
const [state, setState] =useState('Regístrese');
const [formData, setFormData] = useState({
  username:'',
  password:'',
  email:''

})

const changeHandler= (e)=>{
setFormData({...formData,[e.target.name]:e.target.value})
}

const registrese= async () => {
  console.log('registrado',formData);
  let responseData;
await fetch('http://localhost:4000/signup',{
  method:'POST',
  headers:{
    Accept:'application/form-data',
    'Content-Type':'application/json',
  },
  body:JSON.stringify(formData),
}).then((response)=>response.json())
.then((data)=> responseData = data)
/* si se logea correctamente, se guarda en localsttorage y envia al homepage */
if(responseData.success){
  localStorage.setItem('auth-token',responseData.token);
  window.location.replace('/');
}else{
  alert(responseData.errors)
}
}
const ingrese= async () => {
console.log('ingrese',formData)
let responseData;
await fetch('http://localhost:4000/login',{
  method:'POST',
  headers:{
    Accept:'application/form-data',
    'Content-Type':'application/json',
  },
  body:JSON.stringify(formData),
}).then((response)=>response.json())
.then((data)=> responseData = data)
/* si se logea correctamente, se guarda en localsttorage y envia al homepage */
if(responseData.success){
  localStorage.setItem('auth-token',responseData.token)
  window.location.replace('/');
}else{
  alert(responseData.errors)
}
}

  return (
    <div className='loginSignup'>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === 'Regístrese'?<input name='username' value={formData.username} onChange={changeHandler} type='text' placeholder='Ingrese su nombre' />:<></>}
          <input name='email'value={formData.email} onChange={changeHandler}  type="email" placeholder='ingrese su Email' />
          <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='Ingrese su contraseña' />
        </div>
        <button onClick={()=>{state==='Regístrese'? registrese():ingrese()}}>Continuar</button>
        {state==='Regístrese'? 
         <p className="logingsignup-login">¿Ya tiene una cuenta? <span onClick={()=>{setState('Ingrese aquí')}}>Acceda aquí</span></p> :
         <p className="logingsignup-login">¿Desea crear una cuenta? <span onClick={()=>{setState('Regístrese')}}>Acceda aquí</span></p>
     } 
        <div className="loginsignup-agree">
          <input type='checkbox' id='' />
          <p>Para continuar... Estoy de acuerdo con términos y condiciones</p>
        </div>
      </div>
    </div>
  )
}