<template>
  <div class="container">
    <h1>Latest Dishes</h1>
        <div class="create-post">
      <input type="text" id="post-title" v-model="title" placeholder="enter title">
      <input type="text" id="post-desc" v-model="description" placeholder="enter description">
      <input type="text" id="post portionForeign" v-model="portionForeign" placeholder="enter portion">

      <button v-on:click="createPost">Post!</button>
</div>

    <hr />
    <p class="error" v-if="error">{{ error }}</p>
    <div class="posts-container">
      <div
        class="post"
        v-for="(post, index) in posts"
        v-bind:item="post"
        v-bind:index="index"
        v-bind:key="post.dish_id"
        v-on:dblclick="deletePost(post.dish_id)"
      >
      <p class="text">{{post.title}}</p>
      <p class="text">{{post.description}}</p>
      <p class="text">{{post.portionForeign}}</p>


</div>
    </div>
  </div>
</template>

<script>
import PostService from "../PostService";
export default {
  name: "PostComponent",
  data() {
    return {
      posts: [],
      error: "",
      title: "",
      description: "",
      portionForeign: "",
    };
  },
  async created() {
    try {
      this.posts = await PostService.getPosts();
    } catch (error) {
      this.error = error.message;
    }
  },
methods:{
    async createPost(){
      await PostService.insertPost(this.title,this.description,this.portionForeign);
      this.posts = await PostService.getPosts();

    },
    async deletePost(id){
      await PostService.deletePost(id);
      this.posts = await PostService.getPosts();

    }
  
}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.container {
  max-width: 800px;
  margin: 0 auto;
}

p.error {
  border: 1px solid #ff5b5f;
  background-color: #ffc5c1;
  padding: 10px;
  margin-bottom: 15px;
}

div.post {
  position: relative;
  border: 1px solid #5bd658;
  background-color: 3bcffb8;
  padding: 10px 10px 30px 10px;
  margin-bottom: 15px;
}

div.created-at {
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 15px 5px 15px;
  background-color: darkgreen;
}

p.text {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
}
</style>
