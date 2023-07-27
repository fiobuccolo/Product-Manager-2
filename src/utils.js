import { fileURLToPath } from "url";
import { dirname } from "path";
import bcrypt from "bcrypt";

const _filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);

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

export default _dirname;