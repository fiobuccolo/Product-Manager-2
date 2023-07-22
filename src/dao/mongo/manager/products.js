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
             const ProductExist = productModel.findById(id).lean()
            console.log(ProductExist)
             return ProductExist ? ProductExist : "No existe ese id de producto" 
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


