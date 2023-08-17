// en el controlador validamos y respondemos al usuario
import { ProductsService } from "../services/index.js";

const getProducts = async (req,res) =>{
    const products = await ProductsService.getAllProducts();

    console.log(`products: ${JSON.stringify(products)}`);
    res.send(products)
}

// const saveUser = (req,res) => {
//     const {id, first_name, last_name,email} = req.body
//     if(!id ||  !first_name || !last_name || !email){
//         res.status(400).send("Missing params")
//     }
//     const newUser = {id, first_name, last_name,email}
//     usersService.createUser(newUser)
//     res.sendStatus(201)
// }

export default {
     getProducts
}