// 1. Crear carpeta src
// 2. crear archivo app.js y utils.js dentro de la carpeta src
// 3. crear package json: terminal: npm init -y
// 4. En package.json agregar "type":"module"
// 5. Agregar express : terminal : npm i express
// 6. crear carpeta public y routes dentro de src
// 7. crear carpeta views y agregar archivo index.handlebars
// 8- crear carpeta layouts dentro de views y agregar archivo  main.handlebars
// 9. configurar handlebars -- agregar {{{body}}} en el main.handlebars
// 10. saludar desde index.handlebars -->
// 11. instalar el motor de plantillas desde terminal: npm i express-handlebars
// 12. configurarnpm install express-session handlebars desde motor de express 


// npm install express-session
//npm install express cookie-parser 

// 12-->
import express  from "express";
import handlebars from 'express-handlebars';
import mongoose from "mongoose";
import  _dirname from "./utils.js";
//import ProductManager from "../managers/productmanager.js";
import ProductManager from "./dao/mongo/manager/products.js";
import MessageManager from "./dao/mongo/manager/messages.js";
import cookieParser from "cookie-parser";
import session from "express-session";

const productos = new ProductManager()
const mgs = new MessageManager()

// 29. import router
import router from "./routes/views.router.js";
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import messagesRouter from "./routes/messages.router.js";

// clase 10.2 
import { Server } from "socket.io";
const app = express(); 
const connection = await mongoose.connect("mongodb+srv://fiobuccolo:cpXkFd2RxRW7QihN@cluster0.zeygiem.mongodb.net/?retryWrites=true&w=majority")


//13- inicializamos el motor indicando con app.engine que motor utilizaremos
app.engine('handlebars',handlebars.engine());
//14. con app.set("views",ruta) indicamos en que parte del proyecto estaran las vistas
app.set("views",_dirname + "/views")
//15- con app.set("view engine","handlebars") indicamos que el motor que ya inicializamos es el que queremos usar. 
app.set("view engine","handlebars")
//16. seteamos de manera estatica nuestra carpeta public
app.use(express.static(_dirname+ "/public"))
// 30. agregar router -- app use
app.use('/',router) // ruta
app.use('/api/products',productsRouter) // ruta
app.use('/api/carts',cartsRouter)
app.use('/api/chat',messagesRouter)

app.use(express.json()) // ahora el servidor podra recibir json al momento de la peticion
app.use(express.urlencoded({extended:true})) // permite que se pueda enviar información tmbien desde la url

app.use(session({
  secret: "secretCoder",
  resave:true,
  //resave permite mantener la sesion activa en caso de que la sesion se mantega inactiva. 
  saveUninitialized:true,
  //save..permite guardar cualquier sesion aun cuando el objeto de seion no tenga nada por contener
  cookie:{maxAge:10000}
}))

app.get("/session",(req,res)=>{
  if(req.session.counter){
    req.session.counter++;
    res.send(`Se ha visitado el sitio ${req.session.counter} veces`)
  }
  else{
    req.session.counter = 1
    res.send("Bienvenido")
  }
})
//eliminar datos de session
app.get('/logout',(req,res)=>{
  req.session.destroy(err =>{
    if(!err) res.send ("Logout OK")
    else res.send({status:"Logout error",body:err})
  })
})

// LOGIN
app.get("/login",(req,res)=>{
  const {username,password} = req.query;
  if(username !== "pepe" || password !== "pepepass"){
    return res.send("login failed")
  }
  req.session.user = username
  req.session.admin = true
  res.send("login success")
})
// middleware de autenticación
function auth(req,res,next){
  if(req.session?.user === "pepe" && req.session?.admin){
    return next()
  }
  return res.status(401).send("error de autorizacion")
}
// aplicación del middleware
app.get("/privado",auth,(req,res)=>{
  res.send("essoo te  logueaste")
})

/* --- CLASEEE COOOKIEES
 una coookie debe setearse dentro del flujo de vidade una peticio. 
 endpoint /setCookie - el objeto res, para poder asiganr una cookie al cliente
para leerla --> endpoint /getcookies - objeto Req 
limpiar la cookie-- endpoint /deleteCookie 
*/
//app.use(cookieParser("Fiosecret"))
/*app.get("/setCookie",(req,res) =>{
  res.cookie("NombreDeCookie","Esta es mi primer coookie",{maxAge:100000,signed:true}).send("te envio la cookie amigo");
})

app.get("/getCookies",(req,res)=>{
  res.send(req.signedCookies);
})

app.get("/deleteCookie",(req,res)=>{
  res.clearCookie("NombreDeCookie").send("Cookie eliminada")
})
*/


//17. levantamos el servidor
// clase 10.3 --> Agregamos el const httpServer =
 const httpServer = app.listen(8080,()=>{
    console.log("Server is running in port 8080")
})

const socketServer = new Server(httpServer) 
// socketServer sera un servidor para trabajar con sockets

const messages = [];
socketServer.on("connection",socket =>{
    console.log("un cliente se ha conectado")
    socket.emit('products', productos.getProducts());
    socket.on('products', productoId =>{
        console.log(productoId)
        productos.deleteProductoById(parseInt(productoId))
    })
    // -------
    socketServer.emit("messageLogs",messages);
    socket.broadcast.emit("messageConected","Un nuevo usuario se ha conectado")
    //escuchar cuando haya un nuevo mensaje:
    socket.on("message",(data)=>{
        messages.push(data);
        socketServer.emit("messageLogs",messages) //emitir desde el backend todo el mesagge log
    })
    //------
    socket.on('disconnect',()=>{
        console.log("el cliente se ha desconectado")
        socket.emit('products', productos.getProducts());
    }
    )
})






/* CONSIGNA PRE ENTREGA 2
/*
Modificar el metodo get/ para que cumpla con:
- recibir por query params:
  -  un limit (opcional)
    Permitera devolver solo el numero de elementos solicitados al momento de la peticion. 
    default 10
  - una page (opcionar)
    devolver la pagina que queremos buscar, 
    default 1
  - sort (opcional)
  asc/Desc - por precio
  default: ninguno
  - query (opcional)
  tipo de elemento que quiero buscar (que filtro aplicar)
  default: busqueda general

  respusta:
  -un status
  payload: resultado de los productos
  totalpages
  prev page
  next page
  page
  hasprevpage
  hasnect page
  prevlinx
  next ling

se deberá poder buscar productos por categorias o disponibilidad 
ordenamiento de maneras asc. o desc por precio

delete - api/carts/:cid/products/:pid .. elmiar del carrito el producto seleccionado
put - api/carts/:cid  -- actualizar el carrto con una arreglo de productos
put api/carts/:cid/products/:pid -- actualizar solo la cantidad de ejemplaes del producto-
delete api/carts/:cid

modelo carts -- populate del producto, no solo traer el id

crear una vista en el routes. 
views/products -- visualizar todos los productos con su respectiva paginacion
cada producto: 
- llevar a una nueva vista con el producto seleccionado con descripcion completa, precio,categoria, etc y un boton de aregar al carrito
oo
- contar con el boton agregar al carrito directamente sin pagina adicional

- vista carts/:cid
visualizar carrito espectifico, donde se visualizan los productos de dicho carrito
*/