import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const cartCollection = "carts";

const cartSchema = new mongoose.Schema({
    
});
schema.plugin(mongoosePaginate)

const cartModel = mongoose.model(cartCollection,cartSchema);

export default productModel