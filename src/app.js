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
// 12. configurar handlebars desde motor de express 

// 12-->
import express  from "express";
import handlebars from 'express-handlebars';
import mongoose from "mongoose";
import  _dirname from "./utils.js";
//import ProductManager from "../managers/productmanager.js";
import ProductManager from "./dao/mongo/manager/products.js";
import MessageManager from "./dao/mongo/manager/messages.js";
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

