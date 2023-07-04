import axios from "axios"

const urlDish = '/api/dishes' ///day/sun
const urlUser = '/api/users'

class PostService {
    //get Posts


    static getDishes(day) {
        // eslint-disable-next-line
        return new Promise(async (resolve, reject) => {
            try {
                // eslint-disable-next-line        
                const res = await axios.get(urlDish + day);  // /day/{day}
                const data = res.data;

                resolve(data);

                // resolve(data.map(dishes => ({
                //     ...dishes,
                //     // createdAt: new Date(post.createdAt)
                // })))
            } catch (err) {
                reject(err);
            }
        })

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
    static deleteDish(id) {
        return axios.delete(`${urlDish}${id}`);
    }


    static registerUser(email, password, firstName, lastName,title,rank) {
        return axios.post(urlUser + '/register', { email, password, firstName, lastName,title,rank });
    }



    static loginUser(email, password) {
        return axios.post(urlUser + '/login', { email, password });
    }
}

export default PostService;