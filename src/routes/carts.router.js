// 1. importar router 
import { Router } from "express";
//import CartManager from "../../managers/cartmanager.js";
import CartManager from "../dao/mongo/manager/carts.js";
import ProductManager from "../../managers/productmanager.js";
import bodyParser from 'body-parser'


// 2. instanciar router 
const cartsRouter = Router()
const carts = new CartManager('files/carts.json')


/* Primer ENDPOINT: GET: consultar todos los carts **/
cartsRouter.get('/',async (req,res)=>{
     // leer el archivo products y devolverlos dentro de un objeto
     const c = await carts.getCarts()
     res.json({status:"success", data:c});
})
/* SEGUDNO  ENDPOINT: GET: consultar un cart especifico y lista los productos que pertenezcan al carrito **/

  cartsRouter.get("/:cartId", async (req,res) => {
    try{ 
     const { cartId } = req.params;
     console.log(cartId);
     const cart = await (carts.getCartById(cartId))
     res.json(cart);
  }catch(error){ console.log(error)}
    
    })


 



  /* Tercer  ENDPOINT: POSt: Crear un carrito nuevo**/
    cartsRouter.post('/',bodyParser.json(),(req,res)=>{
        try{ 
            const newCart = req.body;
          //  if(!newCart.productos) {
           //     return res.status(400).send ({status:"error",error:"Agregar unm producto al menos para crear un cart"})        
           // } 
            
            carts.addCart(newCart);
            res.status(201).json(newCart)
            //res.send({status:"success",message:"carrito creado"})    

             
        }  catch(error){ throw new Error (error)}
        
       
   })

/* Cuarto  ENDPOINT: POSt: Agregar productos a un carrito**/
cartsRouter.post('/:cid/product/:pid', (req,res) => {
    try{ 
     const { cid, pid } = req.params;
     console.log(cid);
     console.log(pid);

     const cart = (carts.updateCart(cid,pid))
     res.json(cart);
  }catch(error){ console.log(error)}
    
    })


/* QUINTO  ENDPOINT: DELETE: ELiminar un carrito**/
cartsRouter.delete("/:cartId",async (req,res)=>{
  try{ 
    const { cartId } = req.params;
    const cart = await (carts.deleteCartById(cartId))
  return res.json({msg: "delete cart"},{cart})
}catch(error){console.log(error)}}
)

/* SEXTO  ENDPOINT: DELETE: ELiminar un producto de un carrito **/






export default cartsRouter;



/// -------- clase 9 ------
/* 
import express
cons router = express.router()

const products = [
  {name:"producto 1",price:10},
  {name:"producto 2",price:20}
]

router.get("/products",(req,res)=>{
  res.json(products);
});

export default router


*/