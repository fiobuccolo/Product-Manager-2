import dotenv from "dotenv";

const environment = process.env.NODE_ENV || "DEVELOPMENT"

dotenv.config({
    path:environment=== "DEVELOPMENT"? "./src/.env.development" : "./src/.env.production"
})




console.log("Environment: ", environment)
console.log("MongoDB URL: ", process.env.MONGO_URL)
console.log("PORT: ", process.env.PORT)

export default {
    PORT: process.env.PORT || 5000,
    MONGODB_URL: process.env.MONGO_URL,
}
 