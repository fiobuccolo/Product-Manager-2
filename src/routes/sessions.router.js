import Router from "express";
import userModel from "../dao/mongo/models/users.js";

const sessionsRouter = Router();

sessionsRouter.post("/register",async (req,res)=>{
    try{ 
    const newUser = req.body;
    console.log(`hola soy el ${newUser}`)
    //const { first_name , last_name, email, password } = req.body;
    //const user = new userModel([first_name,last_name,email,password])
   // if ( !first_name || !last_name || !email || !password)
     //   return res.send("Datos incompletos")
    const postResponse = await userModel.create(newUser);
    // user.save() // otra forma que no vimos nosotros el save
    res.redirect("/login")
    return res.status(201).json({status:"success", data:postResponse})
    }
    catch(e){console.log(e)} 
})
sessionsRouter.post("/login",async (req,res)=>{
    try{
        //const user = req.body;
    const {email, password} = req.body;
    //const user = new userModel([first_name,last_name,email,password])
    if ( !email || !password)
        return res.send("Datos incompletos")
    const user = await userModel.findOne({email,password});
    if(!user) return res.status(404).json({status:"not found",message:"email or password invalid"});
    req.session.user= {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email
    }
    res.status(200).json({status:"ok"})
    }catch{

    }
})


export default sessionsRouter



