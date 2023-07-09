import axios from "axios"
// const urlComp = '/api/components'
const urlDish = '/api/dishes' ///day/sun
const urlUser = '/api/users'
const urlComp = '/api/components'


class PostService {
    //get Posts

    static async getResponse(url) {
        try {

            const res = await axios.get(`${url}`);
            return res.data;
        } catch (err) {
            return err;
        }

    }


    static async getDishes(day){
        return this.getResponse(urlDish + day);  // /day/{day}
    }




    //create Posts
    static insertDish(title, description, portionForeign, day) {

        return axios.post(urlDish + day, {
            title: title,
            description: description,
            portionForeign: portionForeign

        });
    }

    //Delete Posts
    static changeDish(dish_id) {
        return axios.put(`${urlDish}/${dish_id}`);
    }

    static async getDishComponents(dish_id) {
        // return axios.get(`${urlDish}/${dish_id}`)
        try {
            const res = await axios.get(`${urlDish}/${dish_id}`);  // /day/{day}
            const data = res.data;
            console.log(data);
            return data;
        } catch (err) {
            return err;
        }


    }

    static async getComponents() {
        try {
            const res = await axios.get(`${urlComp}`);
            const data = res.data;
            console.log(data);
            return data;
        } catch (err) {
            return err;
        }

    }

    static getComponent(component_id) {
        return axios.get(`${urlComp}/${component_id}`);
    }


    static registerUser(email, password, firstName, lastName, title, rank) {
        return axios.post(urlUser + '/register', { email, password, firstName, lastName, title, rank });
    }



    static loginUser(email, password) {
        return axios.post(urlUser + '/login', { email, password });
    }

    static getProfile() {
        return axios.get(urlUser + '/profile')
    }

    static logout() {
        return axios.get(urlUser + '/logout')
    }

}

export default PostService;