// 1. importar router 
import { Router } from "express";
// importar product manager
// import ProductManager from "../../managers/productmanager.js";
import ProductManager from "../dao/mongo/manager/products.js";
import bodyParser from 'body-parser'
// 2. instanciar router 
const productsRouter = Router()
const productos = new ProductManager()

productsRouter.get('/', async (req,res)=>{
    // leer el archivo products y devolverlos dentro de un objeto
    const p = await productos.getProducts()
    // imprimir por consola los query params
    // const { limit } = req.query;
    // console.log(limit);
    // si se recibe un limit devolver hasta ese limite de productos
    //if(limit){res.json(p.slice(0,limit))}
    // Si no se recibe query de limite se devuelven todos los resultados
    //else{
     //   console.log("estoy en el else")
        res.json({status:"success", data:p});
      //  res.json({products:p})
    })
    // devolverlos dentro de un objeto
    
//})

/*
- SEGUNDO ENDPOINT: ruta /products/:pid:
- recibe por req.params el product id
- devuelve solo el producto pedido
**/
productsRouter.get('/:pid', async (req,res) => {
    try{ 
    const { pid } = req.params
    console.log(pid)
    const p = await (productos.getProductoById(parseInt(pid)))
    res.json(p)
    }  catch(error){ throw new Error (error)}
})
/*
- Tercer ENDPOINT: post un product /
**/
productsRouter.post('/',bodyParser.json(), async (req,res) => {
    try{ 
        const newProduct = req.body;
        const { name,description,price,category,stock,code } = req.body
        if ( !name || !description || !price || !category || !stock || !code)
        return res.send("Datos incompletos")
        const postResponse =  await productos.addProduct(newProduct);
        console.log("hola")
        return res.status(201).json({status:"success", data:postResponse})
        //res.status(201).json(newProduct); 
    }  catch(error){ throw new Error (error)}
})

/* Cuarto ENDPOINT: delete un product /**/

productsRouter.delete('/:pid', async (req,res)=>{
    try{ 
        const { pid } = req.params;
        console.log(pid)
        const postResponse = productos.deleteProductoById(parseInt(pid))
        return res.status(201).json(postResponse)
        }  catch(error){ throw new Error (error)}
})

/*
- quinto ENDPOINT: PUT un product /
**/

productsRouter.put('/:pid',bodyParser.json(),(req,res)=>{
    try{ 
        const { pid } = req.params;
        const props = req.body;
        console.log(pid)
        const postResponse = productos.updateProduct(parseInt(pid), props)
        return res.status(201).json(postResponse)
        }  catch(error){ throw new Error (error)}
    
})



export default productsRouter;



