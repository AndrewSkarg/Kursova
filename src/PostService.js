import axios from "axios"
// const urlComp = '/api/components'
const urlDish = '/api/dishes' ///day/sun
const urlUser = '/api/users'
const urlComp = '/api/components'
const urlPort='/api/portions'
//const urlDrink='/api/drinks'


class PostService {
    

    static async insertPortion(order,dayF,dishF,kind){
        let createdElement='';
        await axios.post(`${urlPort}/`,{order,dayF,dishF,kind}).then(response => {
                createdElement = response.data; 
                console.log('created:' ,  createdElement);
                
            })
            .catch(error => {
                console.error(error);
            })
        return createdElement;
    }

    static async getPortionByDayTime(day,time){
        const res = await axios.get(`${urlPort}/${day}/${time}`);

        return res.data;

    }


    static async changePortionDrink(portId,drinkId){
        const res = await axios.put(`${urlPort}/${portId}`,{drinkId});
        return res.data;

    }


    static async getDishes(day){
        const res = await axios.get(`${urlDish + day}`);
        return res.data;
    }

    static async getAllDishes(){
        const res = await axios.get(`${urlDish}`);
        return res.data;
    }
    static async removeDish(dish_id){
        const res=await axios.delete(`${urlDish}/${dish_id}`);
        return res.data;
    }

    static async insertDish(title, kind) {
        let createdElement='';
         await axios.post(`${urlDish}/`,{
            title:title,
            kind:kind
        }).then(response => {
                createdElement = response.data; // Отримання створеного елемента з відповіді
                console.log('created:' ,  createdElement);
                // Виконайте потрібні дії зі створеним елементом
            })
            .catch(error => {
                console.error(error);
            });
    return createdElement;
 }

    static async insertComponent(title,count,priceForUnit,unit,description){
        return await axios.post(`${urlComp}/`,{title:title,count:count,priceForUnit:priceForUnit,unit:unit,description:description});
    }

    static async changeDish(dish_id,title,selectedComponents) {
        
        return await axios.put(`${urlDish}/${dish_id}`,{title:title,selectedComponents:selectedComponents});
    }

    static async getDishComponents(dish_id) {
            const res = await axios.get(`${urlDish}/${dish_id}`);  
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