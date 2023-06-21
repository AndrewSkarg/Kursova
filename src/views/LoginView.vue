<template>
  <div>
    <HeaderComponent />
    <div class="loginBox">
      <h1>Login</h1>
      <input type="text" v-model="email" placeholder="email" />
      <input type="text" v-model="password" placeholder="password" />
      <input @click="onLogin" type="submit" value="Login" />
    </div>
  </div>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
export default {
  name: "LoginView",
  components: {
    HeaderComponent,
  },
  data() {
    return {
      email: "",
      password: "",
    };
  },

  methods: {
    onLogin() {
      alert("child component said: " + this.email + " " + this.password);
    },
  },
};
</script>

<style scoped>
.loginBox {
  position: relative;
  margin-left: auto;
  margin-right: auto;
}
</style>
