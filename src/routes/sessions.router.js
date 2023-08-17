import Router, { application } from "express";
import userModel from "../dao/mongo/models/users.js";
import bodyParser from 'body-parser'
import { createHash, generateToken, isValidPassword, verifyToken } from "../utils.js";
import passport from "passport";

const sessionsRouter = Router();

// RUTA DE REGISTER / LOGIN con JWT --
sessionsRouter.post("/register", async(req,res)=>{
    console.log("post")
    const { first_name , last_name, email, password } = req.body;
    // Validación de campos completos:
    if ( !first_name || !last_name || !email || !password)
        return res.status(400).send({status:"error", error: "Datos incompletos"})
    // Validación de si existe el email
    const user =  await userModel.findOne({email:email});
    if(user)
        return res.status(400).send({status:"error",message:"user already exists"});
    const newUser = {
        first_name,
        last_name,
        email,
        password
    }
    const postResponse = await userModel.create(newUser);
    return res.status(200).send({status:"success", payload: postResponse})
    
    } )

sessionsRouter.post("/login", async(req,res)=>{
   
    const { first_name , last_name, email, password } = req.body;
    const user =  await userModel.findOne({email:email} && {password:password});
    // ?  if(!isValidPassword(user,password)) return res.status(403).send({status:"error",message:"incorrect password"})
    if(!user)
       return res.status(403).send({status:"error",message:"incorrect credentials"})
    
    const access_token =  generateToken(user)
         return res.status(200).send({status:"success",payload: access_token})
    })
    
sessionsRouter.get("/private", verifyToken, async(req,res) => {
    
    res.send({status:"Private route",user: req.user})
})

/*
// RUTA DE REGISTER / LOGIN con GITHUB --
        sessionsRouter.get("/github", passport.authenticate("github"), (req,res)=>{
        }) 

        sessionsRouter.get("/githubcallback",passport.authenticate("github",{session: false}), async (req,res)=>{
            // req.session.user = req.user
            res.redirect("/");
})
*/

// RUTA DE REGISTER CON PASSPORT --
  /*  sessionsRouter.post( "/register",
     passport.authenticate("register"),
    async (req,res)=>{
       
        res.status(200).send({status:"success", payload: postResponse})
    */
        //-- 
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
       

    })*/




// RUTA DE LOGIN CON PASSPORT --
  /*  
  sessionsRouter.post("/login", passport.authenticate("login", {failureRedirect: "/failureRedirect"}),
        async (req,res) => {
        if(!req.user)
            return res.status(400).send({
                status:"error", 
                error: "usuario o contraseña incorrecta"
            });
        console.log ("user",req.user);
        req.session.user = req.user;
        res.send({status:"sucess",payload:user})
        }
    )
 */

//--- LOGIN SIN PASSPORT---- 
/* 
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
*/


export default sessionsRouter



