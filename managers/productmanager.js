/*  DESARROLLAR un servidor basado en express
 donde podamos hacer consultas a nuestro archivo de productos

 - se debe usar la clase ProductManager que usamos actualmente para la persistencia de archivos
 - desarrollar uns servidor express que en su archivo app.js importe el archivo de Product Manager que tenemos
 -  el servidor debe contar con los siguientes endpoints:
    - ruta: /products -- leer el archivo products y devolverlos dentro de un objeto
        Agregar para recibir por query param el valor ?limit -- el cual recibira un limite de resultados
        Si no se recibe query de limite se devuelven todos los resultados
        si se recive un limit devolver hasta ese limite de productos
    - ruta /products/:pid:
        - recibe por req.params el product id
        - devuelve solo el producto pedido

        SUGERENCIAS:
            - await y async en endpoints
            - utiliza un archivo que ya tenga productos -- solo get
            -Link a github:
                src -- app-js y productManager
                package.json
                no incluir node_modules. (archivo .gitignore y escribir adentro node_modules)
**/

import { readFileSync, writeFileSync, existsSync } from 'node:fs'
export default class ProductManager {
    static #id;
    static #instance
    #products;
    #path

    constructor(path) {
        // valido si tengo una instancia creada
         if(ProductManager.#instance)
             return ProductManager.#instance; // si existe la devuelve
        //sino la creo:
         this.#path = path;
        this.#products = this.#readFile(); 
        ProductManager.#id = this.#products.length > 0 ? this.#products[this.#products.length - 1].id: 0;     
        //la igualo a nuestra clse:
        ProductManager.#instance = this;
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
    
    getProducts(){  
        if (existsSync(this.#path)){
        const products= readFileSync(this.#path,"utf-8")
        console.log(products)}
        return this.#products;
    }   
    addProduct (newProduct){
        try{
            //console.log(newProduct.code)
            // validación de que estan todos los datos
            if(!newProduct.name || !newProduct.description || !newProduct.price || !newProduct.category || !newProduct.stock || !newProduct.code) {
              return ("Incomplete values")        
                }
            // esta validacion del codigo existente
            const codeExist = this.#products.find(p => p.code === newProduct.code);
            if (codeExist){
            return ("el codigo del producto ya existe")
        } else{
             newProduct.id =  this.#products.length + 1,
           
            this.#products.push(newProduct);
            writeFileSync(this.#path,JSON.stringify(this.#products))
            console.log(this.#products)
            return ("el producto fue agregado con exito")
        }}
        catch(error){console.log(error)}
        }

        
     getProductoById(id){
        const ProductExist = this.#products.find(product=> product.id === id)
             return ProductExist ? ProductExist : "No existe ese id de producto" 
        } 

        getProductoById2(id){
            const ProductExist = this.#products.find(product=> product.id === id)
                 return ProductExist ? ProductExist : false
            } 
    updateProduct(id, props) {
            try {
                const indice = this.#products.findIndex(product => product.id === id);
                if (indice != -1) {
                    const { id, ...rest } = props;
                    this.#products[indice] = { ...this.#products[indice], ...rest };
                    writeFileSync(this.#path, JSON.stringify(this.#products));
                    console.log( 'El producto fue actualizado correctamente!')
                    return ( 'El producto fue actualizado correctamente!')
                } else
                    return (`El producto con ID ${id} no existe`)
                    console.log(`El producto con ID ${id} no existe`)
            } catch (error) {
                console.log(error);
            }
        }
        
    // delete product
    deleteProductoById(id){
            const productIndex = this.#products.findIndex(product=> 
             product.id === id)
            console.log(`Product index: ${productIndex}`)
             if(productIndex >= 0){
                this.#products.splice(productIndex,1);
                writeFileSync(this.#path,JSON.stringify(this.#products))
                return ("producto eliminado")
             }
         return ("No existe ese id de producto")
         
    } 


    }

    