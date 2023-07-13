import cartModel from "../models/carts.js"
import ProductManager from "./products.js"

export default class CartManager {
   

    async getCarts(){  
        return cartModel.find().lean()
    }   

   

    async getCartById(id){
             const cartExist = cartModel.findById(id)
             return cartExist ? cartExist : "No existe ese id de carrito" 
        } 


    
    async addCart (newCart){
        return cartModel.create(newCart)
        }

    async updateCart (cartId,productId) {
       // const indiceCart = this.#carts.findIndex(cart => cart.id === cartId);
        //const existeProducto = this.#products.getProductoById2(productId);
    //     if (indiceCart < 0){
    //         console.log( 'El carrito con ese ID no existe')
    //         return 'El carrito con ese ID no existe'
    //   }  else {
    //         if(existeProducto){
    //             const indiceProduct = this.#carts[indiceCart].products.findIndex(p => p.id === productId);
    //             if(indiceProduct >= 0){
    //                 this.#carts[indiceCart].products[indiceProduct].quantity = this.#carts[indiceCart].products[indiceProduct].quantity +1
    //             }else{
    //                 console.log("No entro por indice producto")
    //             const product = {
    //                 id: productId, 
    //                 quantity: 1
    //             }
    //             this.#carts[indiceCart].products.push(product)
    //             }
    //             writeFileSync(this.#path,JSON.stringify(this.#carts))
    //             return 'El producto fue agregado'
    //              }else{ 
    //                 console.log( 'El producto con ese ID no existe')
    //                 return 'El producto con ese ID no existe'
    //                 }
         return cartModel.findByIdAndUpdate(cartId,productId)
    }

                    

    async deleteCartById (id) {
        return cartModel.findByIdAndDelete(id)
    }

}


//
// delete - api/carts/:cid/products/:pid .. elmiar del carrito el producto seleccionado
// put - api/carts/:cid  -- actualizar el carrto con una arreglo de productos
// put api/carts/:cid/products/:pid -- actualizar solo la cantidad de ejemplaes del producto-
// delete api/carts/:cid
    
    

   
           
