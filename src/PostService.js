import axios from "axios"

const url = 'api/posts/'

class PostService {
    //get Posts

    static getPosts() {
// eslint-disable-next-line
        return new Promise( async (resolve, reject) => {
            try {
// eslint-disable-next-line
                const res =  await axios.get(url);
                const data = res.data;

                resolve(data.map(post => ({
                    ...post,
                    // createdAt: new Date(post.createdAt)
                })))
            } catch (err) {
                reject(err);
            }
        })

    }


    //create Posts
    static insertPost(title, description, portionForeign) {

        return axios.post(url, {
            title: title,
            description: description,
            portionForeign: portionForeign

        });
    }

    //Delete Posts
    static deletePost(id) {
        return axios.delete(`${url}${id}`);
    }
}

export default PostService;