import ProductService from "./products.service.js";
import ProductManager from "../dao/mongo/manager/products.js";


export const ProductsService = new ProductService(new ProductManager())