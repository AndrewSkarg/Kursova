<template>
  <div>
    <HeaderComponent />
    <div id="body">
      <!-- <div class="loginBox">
      <h1>Login</h1>
      <input type="text" v-model="email" placeholder="пошта" />
      <input type="text" v-model="password" placeholder="пароль" />

      <input @click="loginUser" type="submit" value="Login" />
    </div> -->

      <div class="container">
        <h1 class="title">Реєстрація</h1>
        <form @submit.prevent="registerUser">
          <div class="form-group">
            <input
              type="text"
              id="email"
              placeholder="пошта"
              v-model="email"
              v-on:input="
                () => {
                  this.error = '';
                }
              "
              required
            />
          </div>
          <div class="form-group">
            <input
              type="password"
              id="password"
              placeholder="пароль"
              v-model="password"
              required
            />
          </div>

          <div class="form-group">
            <input
              type="text"
              id="firstName"
              placeholder="ім'я"
              v-model="firstName"
              required
            />
          </div>

          <div class="form-group">
            <input
              type="text"
              id="lastName"
              placeholder="прізвище"
              v-model="lastName"
              required
            />
          </div>

          <div class="form-group">
            <input
              type="text"
              id="title"
              placeholder="посада"
              v-model="title"
              required
            />
          </div>

          <div class="form-group">
            <label for="rank">Звання</label>
            <select
              style="min-width: 200px; min-height: 30px"
              id="rank"
              v-model="rank"
            >
              <option value="солдат">Солдат</option>
              <option value="сержант">Сержант</option>
              <option value="лейтенант">Лейтенант</option>
              <option value="майор">Майор</option>
              <option value="підполковник">Підполковник</option>
              <option value="полковник">Полковник</option>
            </select>
          </div>

          <div class="form-group">
            <input
              @click="registerUser"
              type="submit"
              value="Зареєструватися"
            />
          </div>
        </form>
        <p class="error">{{ error }}</p>
        <p>Маєте акаунт? <a href="/login">Увійти</a></p>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url("../assets/css/loginReg.css");
</style>
<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import PostService from "../PostService";
export default {
  name: "RegistrationView",
  components: {
    HeaderComponent,
  },
  data() {
    return {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      rank: "солдат",
      title: "курсант",
      error: "",
    };
  },

  methods: {
    async registerUser() {
      //alert("child component said: " + this.email +' ' +this.password);

      try {
        await PostService.registerUser(
          this.email,
          this.password,
          this.firstName,
          this.lastName,
          this.title,
          this.rank
        );

        this.$router.push("/login");
      } catch (error) {
        this.error = error.response.data.error;
        console.log(error);
      }
    },
  },
};
</script>
