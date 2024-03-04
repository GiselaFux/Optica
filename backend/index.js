const port = 4000;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const mercadopago = require('mercadopago');
require('dotenv').config();

/*  const { log } = require('console');  */


app.use(express.json())//pasa todo a json
app.use(cors());//CONECTAMOS el backend y el frontend 

 /* app.use(function (req, res, next) {

   res.header('Access-Control-Allow-Origin', "http://localhost:4000");
   res.header(
      'Access-Control-Allow-Headers', 
      "Origin, X-Requested-with, Content-type, Accept, Authorization");
   res.header('Access-Control-Allow-Credentials', true);
   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
   next();
 });   */



app.use(morgan('dev'));//sirve para ver por consola las peticiones que van llegando-dev es el mas comun.Hay otros

/* Database Connecttion whith MongoDB */

mongoose.connect("mongodb+srv://giselafux:Lucaan9000@cluster0.6bax7te.mongodb.net/Ecommerce");

/* API creation  */
/* ruta */
app.get('/', (req, res) => {
   res.send('Express APP is running')
})
/* Image Storage Engine */

const storage = multer.diskStorage({
   destination: './upload/images',
   filename: (req, file, cb) => {
      return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
   }
})


const upload = multer({ storage: storage })

/* creating Upload endpoint for images */
app.use('/images', express.static('upload/images'))//para acceder a la carpeta de la imagenes-como public
app.post('/upload', upload.single('product'), (req, res) => {
   res.json({
      success: 1,
      image_url: `http://localhost:${port}/images/${req.file.filename}`
   })
})

/* Schema for Creating Products */
const Product = mongoose.model("Product", {
   id: {
      type: Number,
      required: true,
   },
   name: {
      type: String,
      required: true,
   },
   image: {
      type: String,
      required: true,
   },
   category: {
      type: String,
      required: true,
   },
   new_price: {
      type: Number,
      required: true,
   },
   old_price: {
      type: Number,
      reuired: true,
   },
   date: {
      type: Date,
      default: Date.now,
   },
   avilable: {
      type: Boolean,
      default: true,
   },
})

app.post('/addproduct', async (req, res) => {
   /* con esto de abajo, hasta const product, lo qque logro es q id se incremente de uno en uno desde 0+1 */
   let products = await Product.find({});
   let id;
   if (products.length > 0) {
      let last_product_array = products.slice(-1);
      let last_product = last_product_array[0];
      id = last_product.id + 1;
   } else {
      id = 1;
   }
   const product = new Product({
      id: id,
      name: req.body.name,
      image: req.body.image,
      category: req.body.category,
      new_price: req.body.new_price,
      old_price: req.body.old_price,
   });
   console.log(product);
   await product.save();/* con esto salva en la base de datos el nuevo producto */
   console.log('Saved');
   res.json({
      success: true,
      name: req.body.name,
   })
})

/* Creating API for deleting Product */

app.post('/removeproduct', async (req, res) => {
   await Product.findOneAndDelete({ id: req.body.id });
   console.log("Removed");
   res.json({
      success: true,
      name: req.body.name
   })
})

/* Creating Api for getting all products */


app.get('/allproducts', async (req, res) => {
   let products = await Product.find({});
   console.log('allproducts fetched');
   res.send(products);
})


/* esquema, modelo para usuariosque serviran para la api para crear un usuario */

const Users = mongoose.model('Users', {
   name: {
      type: String,
   },
   email: {
      type: String,
      unique: true,
   },
   password: {
      type: String,
   },
   cartData: {
      type: Object,
   },
   date: {
      type: Date,
      default: Date.now,
   }
})

app.post('/signup', async (req, res) => {
   /* chequearemos si el email existe o no */
   let check = await Users.findOne({ email: req.body.email });
   if (check) {
      return res.status(400).json({ success: false, errors: 'Usuario encontrado con el mismo email' })
   }
   let cart = {};
   for (let i = 0; i < 300; i++) {
      cart[i] = 0;
   }
   const user = new Users({
      name: req.body.username,
      email: req.body.email,
      password: req.body.password,
      cartData: cart,
   })
   await user.save();

   const data = {
      user: {
         id: user.id
      }
   }

   const token = jwt.sign(data, 'secret_ecom');
   res.json({ success: true, token })
})

//creación del endpoint para registro del ususario

app.post('/login', async (req, res) => {
   let user = await Users.findOne({ email: req.body.email });
   if (user) {
      const passCompare = req.body.password === user.password;
      if (passCompare) {
         const data = {
            user: {
               id: user.id
            }
         }
         const token = jwt.sign(data, 'secret_ecom');
         res.json({ success: true, token });
      }
      else {
         res.json({ success: false, errors: 'Password erroneo' });
      }
   }
   else {
      res.json({ success: false, errors: 'Error en el Email' })
   }
})




/* creating endpoint for newCollectiondata */
app.get('/newcollections', async (req, res) => {
   let products = await Product.find({});
   let newcollection = products.slice(1).slice(-8);
   console.log('newCollections fetched')
   res.send(newcollection)
})

/*  creating endpoint for popular in woman section*/
app.get('/popularinwomen', async (req, res) => {
   let products = await Product.find({ category: 'women' });
   let popular_in_women = products.slice(0, 4);
   console.log('Popular in women fetched')
   res.send(popular_in_women)
})

/* creating middleware to fetch user */
const fetchUser = async (req, res, next) => {
   const token = req.header('auth-token');
   if (!token) {
      res.status(401).send({ errors: 'Por favor, necesito se autentique usando un token válido' })
   } else {
      try {
         const data = jwt.verify(token, 'secret_ecom');
         req.user = data.user;
         next();
      } catch (error) {
         res.status(401).send({ errors: 'Por favor, autenticarse con un token válido' })
      }
   }
}

/* creating endpointfor adding products in cartdata */
app.post('/addtocart', fetchUser, async (req, res) => {
   console.log('Added', req.body.itemId)
   let userData = await Users.findOne({ _id: req.user.id });
   userData.cartData[req.body.itemId] += 1;
   await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
   res.send('Added')
})


/* creating endpoint to remove product from cartData */
app.post('/removefromcart', fetchUser, async (req, res) => {
   console.log('removed', req.body.itemId)
   let userData = await Users.findOne({ _id: req.user.id });
   if (userData.cartData[req.body.itemId] > 0)
      userData.cartData[req.body.itemId] -= 1;
   await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
   res.send('Removed')
})


/* creating endpoint to  get cartdata */
app.post('/getcart', fetchUser, async (req, res) => {
   console.log('GetCart');
   let userData = await Users.findOne({ _id: req.user.id });
   res.json(userData.cartData);
})


//mercado pago


mercadopago.configure({ access_token: process.env.MERCADOPAGO_KEY });

/* app.post('/payment', (req, res) => {
   
   let preference = {
      items: [{
         id: Number(req.body.id),
         title: req.body.name,
         picture_url:req.body.image,
         category: req.body.category,
         currency_id: "ARS",
         unit_price: Number(req.body.new_price),
         quantity:Number(req.body.cartData),
      }],
      back_urls: {
         success: 'http://localhost:3000',
         failure: '',
         pending: '',
      },
      auto_return: "approved",
      binary_mode: true,//esto quiere decir que no se acepatn pagos de otra forma que no sea x tarjetas
   }
   mercadopago.preferences.create(preference)
      .then((response) => res.status(200).send({ response }))
      .catch((error) => res.status(400).send({ error: error.message }))

}) */
 
app.post('/create_preference', async (req, res) => {
   try{
   let preference= {
      items: [{
         id: Number(req.body.id),
         title: req.body.name,
         picture_url:req.body.image,
         category: req.body.category,
         currency_id: "ARS",
         unit_price: Number(req.body.new_price),
         quantity:Number(req.body.cartData),
      }],
    /*   payer:{
         name:req.body.name,
         email:req.body.email
      }, */
      back_urls: {
         success: 'http://localhost:3000',
         failure: '',
         pending: '',
      },
      auto_return: "approved",
      binary_mode: true,//esto quiere decir que no se acepatn pagos de otra forma que no sea x tarjetas
   }
   const respuesta = await mercadopago.preferences.create(preference);
    console.log(respuesta);
    res.status(200).json(respuesta.response.init_point);
  } catch (error) {
    console.error(error.message);
    res.status(500).json(error.message);
  }
    });

app.get('/payment', (req,res)=>{
   res.send('corriendo payment')
})

/* app.get('/success',(req,res)=> {res.send('ordering is success')

})
app.get('/webhook',(req,res)=> {res.send('ordering is pending')

}) */











/* inicio making reference to the cont port=4000 */
app.listen(port, (error) => {
   if (!error) {
      console.log('server running on Port' + port)
   } else {
      console.log('Error: ' + port)
   }
})
