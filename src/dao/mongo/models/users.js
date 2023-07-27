import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"


const usersCollection = "users";

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
        },
    last_name: {
        type: String,
        required: true
        },
    email: {
        type:String,
        unique:true,
        required:true
    },
    password: {
        type: String,
        required: true
        },
});

userSchema.plugin(mongoosePaginate)

const userModel = mongoose.model(usersCollection,userSchema);

export default userModel