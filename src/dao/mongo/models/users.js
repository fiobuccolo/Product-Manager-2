import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"


const usersCollection = "users";

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    
    email: {
        type:String,
        unique:true,
    },
    password: String,
});

userSchema.plugin(mongoosePaginate)

const userModel = mongoose.model(usersCollection,userSchema);

export default userModel