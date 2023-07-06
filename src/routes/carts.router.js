// 1. importar router 
import { Router } from "express";
import CartManager from "../../managers/cartmanager.js";
import ProductManager from "../../managers/productmanager.js";
import bodyParser from 'body-parser'


// 2. instanciar router 
const cartsRouter = Router()
const carts = new CartManager('files/carts.json')


/* Primer ENDPOINT: GET: consultar todos los carts **/
cartsRouter.get('/',(req,res)=>{
     // leer el archivo products y devolverlos dentro de un objeto
     const c = carts.getCarts()
     res.json({carts:c})
    
})
/* SEGUDNO  ENDPOINT: GET: consultar un cart especifico y lista los productos que pertenezcan al carrito **/

  cartsRouter.get("/:cartId", async (req,res) => {
    try{ 
     const { cartId } = req.params;
     console.log(cartId);
     const cart = await (carts.getCartById(parseInt(cartId)))
     res.json(cart);
  }catch(error){ throw new Error (error)
    }
    })

  /* Tercer  ENDPOINT: POSt: Crear un carrito nuevo**/
    cartsRouter.post('/',bodyParser.json(),(req,res)=>{
        try{ 
            const newCart = req.body;
          //  if(!newCart.productos) {
           //     return res.status(400).send ({status:"error",error:"Agregar unm producto al menos para crear un cart"})        
           // } 
            
            carts.createCart(newCart);
            res.status(201).json(newCart)
            //res.send({status:"success",message:"carrito creado"})    

             
        }  catch(error){ throw new Error (error)}
        
       
   })

/* Cuarto  ENDPOINT: POSt: Agregar productos a un carrito**/
cartsRouter.post('/:cid/product/:pid',async (req,res) => {
    try{ 
     const { cid, pid } = req.params;
 //    console.log(cid,pid);


     const cart = await (carts.updateCart(parseInt(cid),parseInt(pid)))
     res.json(cart);
  }catch(error){ throw new Error (error)
    }
    })


/* QUINTO  ENDPOINT: DELETE: ELiminar un carrito**/
cartsRouter.delete('/',(req,res)=>{
  return res.json({msg: "delete cart"})
})
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