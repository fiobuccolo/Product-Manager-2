import productModel from "../models/products.js"


export default class ProductManager {
    static #instance
    constructor() {
        ProductManager.#instance = this;
    }

    async paginateProducts(limit,page, filter,sort){
    
         return productModel.paginate(filter,{ page, limit, sort, lean:true}); 
  
    }
    
    async getProducts (){  
        return productModel.find().lean()
    }   

    async getProductoById(id){
            // const ProductExist = productModel.findById(id)
           //  return ProductExist ? ProductExist : "No existe ese id de producto" 
             return productModel.findById(id)
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


