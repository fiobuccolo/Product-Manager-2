import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import ProductManager from './productmanager.js';


export default class CartManager {
    #id;
    #carts;
    #path
    #products

    constructor(path) {
        // CartManager.#id = this.#carts.length > 0 ? this.#carts[this.#carts.length-1].id :0;
        this.#path = path;
        this.#carts = this.#readFile();  
        this.#products = new ProductManager('files/productos.json');
    }

    #readFile(){
        try{
            let data;
            if (existsSync(this.#path))
                data = JSON.parse(readFileSync(this.#path,"utf-8"));
            else 
             data = []
            return data
        }
        catch(error){console.log(error)}
    }
    
    getCarts(){  
        if (existsSync(this.#path)){
        const carts= readFileSync(this.#path,"utf-8")
        console.log(carts)}
        return this.#carts;
    }   

    //crear un nuevo carrito:
        //id
        //products (array)
    createCart (){
        try{
        //   console.log(id)
        //const idExist = this.#carts.find(c => c.id === id);
        // if (idExist){
        //     console.log("el id del cart ya existe")
        // } else{
            const newCart = {
                id: this.#carts.length + 1,
                products: []
            }
            this.#carts.push(newCart);
            writeFileSync(this.#path,JSON.stringify(this.#carts))
            console.log(this.#carts)
            return id 
        } catch(error){console.log(error)}
        }

     getCartById(id){
            const CartExist = this.#carts.find(cart => 
                 cart.id === id)
             return CartExist ? CartExist : "No existe ese id de cart"  
            }

           

        /*
         agrega un producto al carrito - 
         solo agregar el id
        quantity; debe contener el numero de ejemplares  de dicho producto
        */
    updateCart(cartId, productId) {
            try {
                 const indiceCart = this.#carts.findIndex(cart => cart.id === cartId);
                const existeProducto = this.#products.getProductoById2(productId);
             console.log(`carrito: ${indiceCart}`)
             console.log(existeProducto) 

               // const product = cart.#products.find(product => product.id == productId);
               if (indiceCart < 0){
                    console.log( 'El carrito con ese ID no existe')
                    return 'El carrito con ese ID no existe'
              }  else {
                    if(existeProducto){
                        
                        const indiceProduct = this.#carts[indiceCart].products.findIndex(p => p.id === productId);
                        
                        
                        if(indiceProduct >= 0){
                            console.log("entro por indice producto")
                            this.#carts[indiceCart].products[indiceProduct].quantity = this.#carts[indiceCart].products[indiceProduct].quantity +1
                        }else{
                            console.log("No entro por indice producto")
                        const product = {
                            id: productId, 
                            quantity: 1
                        }
                        this.#carts[indiceCart].products.push(product)
                        }
                        writeFileSync(this.#path,JSON.stringify(this.#carts))
                        return 'El producto fue agregado'

                         }else{ 
                            console.log( 'El producto con ese ID no existe')
                            return 'El producto con ese ID no existe'
                            }
                    }
                 }catch (error) {console.log(error);
                 }
                }
        }