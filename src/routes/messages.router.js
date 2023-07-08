// 1. importar router 
import { Router } from "express";
// importar product manager
// import ProductManager from "../../managers/productmanager.js";
import MessageManager from "../dao/mongo/manager/messages.js";
import bodyParser from 'body-parser'
// 2. instanciar router 
const messagesRouter = Router()
const messages = new MessageManager()


messagesRouter.get("/", async (req, res) => {
	const m = await messages.getMessages()
    res.status(201).json({status:"success", data:m})
  //  res.render('chat',{m});
})

messagesRouter.post('/',bodyParser.json(), async (req,res) => {
    try{ 
        console.log("entre al post")
        const newMessage = req.body;
        const { user_name, message } = req.body
        if ( !user_name || !message)
        return res.send("Datos incompletos")
        const postResponse =  await messages.addMessage(newMessage)
        console.log("hola")
        return res.status(201).json({status:"success", data:postResponse})
    }  catch(error){console.log(error)}
})






export default messagesRouter;



