import mongoose from "mongoose";

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

const productModel = mongoose.model(productsCollection,productSchema);

export default productModel