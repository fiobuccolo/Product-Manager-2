const productsCollection = "products";
import mongoose from "mongoose";

const messagesCollection = "messages";

const messageSchema = new mongoose.Schema({
    message: String,
    user_name: String,
    user_email: String
});

const messageModel = mongoose.model(messagesCollection,messageSchema);

export default messageModel