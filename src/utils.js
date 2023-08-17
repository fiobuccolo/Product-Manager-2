import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);


// BCRYPTT --- 
export const createHash = password =>
bcrypt.hashSync(password,bcrypt.genSaltSync(10));
/*{
 let hashPassword = bcrypt.hashSync(password,bcrypt.genSaltSync(10));
  console.log(hashPassword)
  return hashPassword

}*/

export const isValidPassword = (user,password) => {
    console.log(`isvalid : ${user}`)
    console.log(`isvalid : ${password}`)
    console.log(`isvalid : ${user.password}`)
    let hashPassword = bcrypt.compareSync(password, user.password);
    console.log(hashPassword)
    return hashPassword
}
// JSONWEB TOKEN ---

const JWT_SECRET = "mysecret";
export const generateToken = (user) => {
  const token = jwt.sign({id: user.id,email:user.email}, JWT_SECRET, {expiresIn: '1d'})
  return token
}

export const verifyToken = (req,res,next) =>{
  const autHeader = req.headers["authorization"];
  if(!autHeader) return res.sendStatus(401);
  const token = autHeader.split(" ")[1];
  jwt.verify(token,JWT_SECRET,(err,credentials)=>{
    if(err) return res.status(403).send("Not authorized");
    req.user = credentials.user;
    next()
  })
}

export default _dirname;