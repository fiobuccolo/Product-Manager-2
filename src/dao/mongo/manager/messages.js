import messageModel from "../models/messages.js";

export default class MessageManager {

    async getMessages(){  
        return messageModel.find().lean()
    }   

    async getMessageById(id){
             const messageExist = messageModel.findById(id)
             return messageExist ? messageExist : "No existe ese id de mensaje" 
        } 


    async addMessage (newMessage){
        return messageModel.create(newMessage)
        }

    async updateMessage (id,message) {
        return messageModel.findByIdAndUpdate(id,message)
    }

    async deleteMessageById (id) {
        return messageModel.findByIdAndDelete(id)
    }

}
