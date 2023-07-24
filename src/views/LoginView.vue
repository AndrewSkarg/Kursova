<template>
  <div>
    <HeaderComponent />
    <div id="body">
      

      <div class="container">
        <h1 class="title">Аутентифікація</h1>
        <form @submit.prevent="loginUser">
          <div class="form-group">
            <label for="username">Email</label>
            <input
              type="text"
              id="email"
              placeholder="пошта"
              v-model="email"
              v-on:input="()=>{this.error=''}"
              required
            />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="пароль"
              v-model="password"
              v-on:input="()=>{this.error=''}"
              required
            />
          </div>
          <div class="form-group">
            <input type="submit" value="Login" />
          </div>
        </form>
        <p class="error">{{ error }}</p>
        <p>Не маєте акаунту? <a href="/register">Зареєструватися</a></p>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import PostService from "../PostService";

export default {
  name: "LoginView",
  components: {
    HeaderComponent,
  },
  data() {
    return {
      email: '',
      password: '',
      error:''
    };
  },

  methods: {
    async loginUser() {
      try {
        await PostService.loginUser(this.email, this.password);
        this.$router.push("/profile");
      
      } catch (error) {
        console.log('err: '  , error.response.data.error);
        this.error=error.response.data.error;
      }
    },
  },
};
</script>

<style ref scoped>
@import url("../assets/css/loginReg.css");
</style>
