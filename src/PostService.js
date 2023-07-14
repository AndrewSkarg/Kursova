import axios from "axios"
// const urlComp = '/api/components'
const urlDish = '/api/dishes' ///day/sun
const urlUser = '/api/users'
const urlComp = '/api/components'


class PostService {
    
    static async getDishes(day){
        const res = await axios.get(`${urlDish + day}`);
        return res.data;
    }


    static async insertDish(title, kind) {

        return await axios.post(`${urlDish}/`,{
            title: title,
            kind:kind
        });
    }

    static async insertComponent(title,count,priceForUnit,unit,description){
        return await axios.post(`${urlComp}/`,{title:title,count:count,priceForUnit:priceForUnit,unit:unit,description:description});
    }

    static async changeDish(dish_id) {
        
        return await axios.put(`${urlDish}/${dish_id}`);
    }

    static async getDishComponents(dish_id) {
            const res = await axios.get(`${urlDish}/${dish_id}`);  // /day/{day}
            return res.data;
    }
    
    static async getComponents() {
            const res = await axios.get(`${urlComp}`);
            return res.data;
    }

    static async getComponent(component_id) {
        return await axios.get(`${urlComp}/${component_id}`);
    }


    static async registerUser(email, password, firstName, lastName, title, rank) {
        return await axios.post(urlUser + '/register', { email, password, firstName, lastName, title, rank });
    }



    static async loginUser(email, password) {
        return await axios.post(urlUser + '/login', { email, password });
    }

    static async getProfile() {
        return await axios.get(urlUser + '/profile')
    }

    static async logout() {
        return await axios.get(urlUser + '/logout')
    }

}

export default PostService;