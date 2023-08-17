// 1. importar router 
import { Router } from "express";
import productsController from "../controllers/products.controller.js";
// importar product manager
// import ProductManager from "../../managers/productmanager.js";
import ProductManager from "../dao/mongo/manager/products.js";
import bodyParser from 'body-parser'
// 2. instanciar router 
const productsRouter = Router()
const productos = new ProductManager()


// COMENTO ESTO PARA PROBAR EL CONTROLER
// productsRouter.get('/', async (req,res)=>{
//     const p = await productos.getProducts()
//         res.json({status:"success", data:p});
//     })
    
productsRouter.get("/",productsController.getProducts)

/*
- SEGUNDO ENDPOINT: ruta /products/:pid:
- recibe por req.params el product id
- devuelve solo el producto pedido
**/
productsRouter.get('/:pid', async (req,res) => {
    try{ 
    const { pid } = req.params
    console.log(`HOlaaaa este es el ${pid}`)
    const p = await (productos.getProductoById(pid))
    res.json(p)
    }  catch(error){ console.log(error)}
})
/*
- Tercer ENDPOINT: post un product /
**/
productsRouter.post('/',bodyParser.json(), async (req,res) => {
    try{ 
        console.log("post")
        const newProduct = req.body;
        const { name,description,price,category,stock,code } = req.body
        if ( !name || !description || !price || !category || !stock || !code)
        return res.send("Datos incompletos")
        const postResponse =  await productos.addProduct(newProduct);
        console.log("hola")
        return res.status(201).json({status:"success", data:postResponse})
        //res.status(201).json(newProduct); 
    }  catch(error){console.log(error)}
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
        const postResponse = productos.updateProduct(pid, props)
        return res.status(201).json(postResponse)
        }  catch(error){ throw new Error (error)}
    
})



export default productsRouter;



