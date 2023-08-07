import passport from "passport";
import local from "passport-local";
import userModel from "../dao/mongo/models/users.js";
import bodyParser from "body-parser";
import GithubStrategy from "passport-github2"
//import GithubStrategy from "passport-github"

import { createHash, isValidPassword } from "../utils.js";

const localStrategy = local.Strategy;


const initializePassport = () => {
    // passport utiliza sus propios "middlewares" de acuerdo a cada estrategia
    // username sera en este caso el correo
    // done, sera el callback de resolucion
    // -- COmento estrategia de passport local paara clase del 20/07 githubstrategy 
        // LOCAL STRATEGY
            /*   passport.use(
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
            */
        //----  LOGIN PASSPORT LOCAL-----
            /* passport.use ("login", new localStrategy ({
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
    */
 
    // ESTRATEGIA DE GITHUB
    passport.use("github", new GithubStrategy({
        clientID:"Iv1.0a968fb82c4611c4",
        clientSecret: "46a021f7b89bac963b163b7d5a2c29ea302b5517",
        callbackURL:"http://localhost:8080/api/sessions/githubcallback",
        scope: 'user:email, user:name'
    }, async (accesToken,refreshToken, profile, done) =>{
       try {
        console.log("hola estoy en el config")
        console.log(`email: ${profile.emails[0].value}`);
        console.log(`id: ${profile._json.id}`);
        console.log(profile);
        if (!profile.emails[0].value){
            console.log("No tengo el email")
            return done("Error al obtener el usuario") }
        const user =  await userModel.findOne({email:profile.emails[0].value});
        console.log(profile._json.name.split(" ")[0],profile._json.name.split(" ")[1],)
        if(!user){
            const newUser = {
                first_name:profile._json.name.split(" ")[0],
                last_name: profile._json.name.split(" ")[1],
                email:profile.emails[0].value,
                password:"",
            }
            const result = await userModel.create(newUser);
            return done(null, result);
        } else {
            return done(null, user);
          }
       } catch (error) {
        return done("Error al obtener el usuario"+error) 
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