import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"


const productsCollection = "products";

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    category: String,
    stock: Number,
    code: {
        type:String,
        unique:true,
    }
});

productSchema.plugin(mongoosePaginate)

const productModel = mongoose.model(productsCollection,productSchema);

export default productModel