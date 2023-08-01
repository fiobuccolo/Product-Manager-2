import Router from "express";
import userModel from "../dao/mongo/models/users.js";
import bodyParser from 'body-parser'
import { createHash, isValidPassword } from "../utils.js";
import passport from "passport";


const sessionsRouter = Router();

sessionsRouter.post(
    "/register",
     passport.authenticate("register"),
    async (req,res)=>{
       
        res.status(200).send({status:"success", payload: postResponse})
    /* try{
    
    console.log(`hola soy el ${newUser}`)
    //const { first_name , last_name, email, password } = req.body;
    console.log(`hola soy la ${password}`)
    console.log(`hola soy el ${first_name}`)
    // const user = new userModel([first_name,last_name,email,password])
    if ( !first_name || !last_name || !email || !password)
        return res.status(400).send({status:"error", error: "Datos incompletos"})
    let newUser = {
        first_name,
        last_name,
        email,
        password: createHash(password)
    }
    console.log(newUser)
  
    const postResponse = await userModel.create(newUser);
    // user.save() // otra forma que no vimos nosotros el save
    //res.redirect("/login")
    
     return res.status(200).send({status:"success", payload: postResponse})
         }catch(error){res.status(400).json({status:"error", data:error})
        console.log(error)}
        */

    })

sessionsRouter.post("/login", bodyParser.json(),async(req,res)=>{
    try{
        //const user = req.body;
    const {email, password} = req.body;
    console.log(`hola ${email}`)  
     console.log(`hola ${password}`)
    if ( !email || !password)
        return res.status(400).send({status:"error", error: "Datos incompletos"})
    const user =  await userModel.findOne({email:email});
   // console.log(user)
    if(!user) return res.status(404).send({status:"error",message:"user not found"});
    if(!isValidPassword(user,password)) return res.status(403).send({status:"error",message:"incorrect password"})

    delete user.password
    //req.session.user= user;
    console.log(user)
    //  req.session.user = {
    //      name: `${user.first_name} ${user.last_name}`,
    //      email: user.email
    //  }
    //  console.log(req.session.user)
    res.status(200).send({status:"success", payload: user})
    }catch{

    }
})


export default sessionsRouter



