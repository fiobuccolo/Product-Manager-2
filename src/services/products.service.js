export default class ProductService{
    constructor(dao) {
        this.dao = dao
    }

    getAllProducts = () => {
        return this.dao.getProducts()
    };

    // createUser = (user) => {
    //     return this.dao.saveUser(user);
    // };

}