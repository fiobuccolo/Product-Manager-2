import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const cartCollection = "carts";

const cartSchema = new mongoose.Schema({
    products: [{
        _id:{
            type:mongoose.Schema.Types.ObjectId,
            ref: 'Products'
        },
        quantity: Number,
    }]
})

//cartSchema.pre("find",function() {
  //  this.populate("products.product")
//})

cartSchema.plugin(mongoosePaginate)

const cartModel = mongoose.model(cartCollection,cartSchema);

export default cartModel