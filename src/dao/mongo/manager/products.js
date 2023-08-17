import productModel from "../models/products.js"


export default class ProductManager {
    static #instance
    constructor() {
        ProductManager.#instance = this;
    }

    async paginateProducts(limit,page, filter,sort){ 
         const producs = productModel.paginate(filter,{ page, limit, sort, lean:true}); 
      console.log(`desde el managerproducs`)
      return producs
    }
    
    async getProducts (){  
        return productModel.find().lean()
    }   

    async getProductoById(id){
            const product = await productModel.findOne({_id: id});
            if(!product) {
                return ({message: "Product not found"});
            }
            return product
        } 


    async addProduct (newProduct){
        return productModel.create(newProduct)
        }

    async updateProduct (id,product) {
        return productModel.findByIdAndUpdate(id,product)
    }

    async deleteProductoById (id) {
        return productModel.findByIdAndDelete(id)
    }

}


