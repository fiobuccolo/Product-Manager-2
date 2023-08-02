import passport from "passport";
import local from "passport-local";
import userModel from "../dao/mongo/models/users.js";
import bodyParser from "body-parser";

import { createHash, isValidPassword } from "../utils.js";

const localStrategy = local.Strategy;


const initializePassport = () => {
    // passport utiliza sus propios "middlewares" de acuerdo a cada estrategia
    // username sera en este caso el correo
    // done, sera el callback de resolucion
    
    passport.use(
        "register",
      new localStrategy(
        {
             usernameField: "email",
             passReqToCallback: true,
            // passReqToCallback permite que e pueda acceder al objeto req como cualquier otro middlewEW     
        },
        
         async ( req, username, password, done) => {
            console.log("HOllaaa!")
           
            console.log(username)
            console.log("chauuu!")
                const { first_name, last_name, email} = req.body;
                console.log(first_name)
                if (!first_name ||!last_name || !email )
                    return done(null, false, {message: "Faltan datos"})
            try{
                console.log("llegue al try")
                const user = await userModel.findOne({ email:username });
               
                if (user){
                    console.log(user)
                    return done(null, false, {message: "User already exists"})
                }
                console.log("no encontre el user, deberia crear uno")
                console.log(first_name,last_name ,email,password)
                const newUser = {
                    first_name,
                    last_name,
                    email,
                    password: createHash(password),
                }
                
                const result = await userModel.create(newUser);
                return done(null, result, {message: "User creado"})
            }catch(error){
                return done("Errro al obtener el usuario" + error)
            }
        }
    ));

    passport.use ("login", new localStrategy ({
        usernameField:"email",
        },
        async (username,password,done) => {
            try{
                const user = await userModel.findOne({email: username});
                if(!user) {
                    return done(null,false, {message: "User not found"});
                }
                if (!isValidPassword(user, password)){
                    return done(null,false, {message: "Wrong password"});
                }
                return done(null,user);
            }catch(error){
                return done("error al obtener el usuario" + error);
            }
        }
    ))

   passport.serializeUser((user,done) => {
    done(null, user._id)
   });

   passport.deserializeUser(async (_id,done) =>{
    const user = userModel.findById(_id);
    done(null,user);
   })

}

export default initializePassport;


/*
passport utiliza un callback "done"., el cual se resuelve:
    . primer parametro de done es el error -- si pasamos done(null) indicamos que no hay error
    . el segundo parametro debe ser el usuario logueado 
*/