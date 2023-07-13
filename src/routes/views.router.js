
//26. traerme esto aca y no en app
// 27. import de express
import  express  from "express";
//import ProductManager from "../../managers/productmanager.js";
import ProductManager from "../dao/mongo/manager/products.js";
import productModel from "../dao/mongo/models/products.js";
// 24. agregar  router
const router = express.Router();
const productos = new ProductManager()


router.get('/',async (req,res)=>{
    res.render('index',{});
})

router.get('/realTimeProducts',(req,res)=>{
    return res.render('realTimeProducts')
})
router.get('/products', async (req,res)=>{ 
    const { page= 1 } = req.query;
    const { dosc, hasPrevPage, hasNextPage, prevPage, netxPage, ...rest} = 
    await productModel.paginate({ },{ page, limit:1000, lean:true});
   const productos = docs;
    res.render('products',{
        productos,
        page:rest.page,
        hasPrevPage,
        hasNextPage,
        prevPage,
        netxPage
    })
})

router.get("/chat",  (req, res) => {
   res.render('chat',{});
})



//router.get('*',(req,res)=>{
//    return res.send ('Pagina no encontrada')
//})

// 28. export router
export default router;


