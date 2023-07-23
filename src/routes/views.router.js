
//26. traerme esto aca y no en app
// 27. import de express
import  express  from "express";
//import ProductManager from "../../managers/productmanager.js";
import ProductManager from "../dao/mongo/manager/products.js";
import productModel from "../dao/mongo/models/products.js";
import productsRouter from "./products.router.js";
// 24. agregar  router
const router = express.Router();
const productos = new ProductManager()


router.get('/',async (req,res)=>{
    res.render('index',{});
})

router.get('/realTimeProducts',(req,res)=>{
    return res.render('realTimeProducts')
})




/// CONSIGNA 2da preentrega:
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
*/

   
   // en el campo docs obtrendremos los resultados que solicitamos, y la info de la paginación
router.get('/products', async (req,res)=>{ 
    let { limit = 4, page = 1, filter = null, sort = null } = req.query  
    const { docs,hasPrevPage, hasNextPage, prevPage, nextPage, ...rest} =
    await productos.paginateProducts(limit,page,filter,sort)
    const prods = docs
    console.log(prods,hasPrevPage,
      hasNextPage,
      prevPage,
      nextPage)
    res.render('products',{
        prods,
        page:rest.page,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage
    })
})

router.get("/chat",  (req, res) => {
   res.render('chat',{});
})

// ------ RUTA REGISTROOO ---------
router.get("/register",  (req, res) => {
  res.render('register',{});
})
// ------ RUTA LOGIN ---------
router.get("/login",  (req, res) => {
  res.render('login',{});
})
// ------ RUTA PROFILE ---------
router.get("/profile",  (req, res) => {
  res.render('profile',{});
})
//router.get('*',(req,res)=>{
//    return res.send ('Pagina no encontrada')
//})

// 28. export router
export default router;


