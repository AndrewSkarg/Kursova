<template>
  <div>
    <input type="text" v-model="logi" placeholder="login" />
    <input type="text" v-model="password" placeholder="password" />
    <input type="text" v-model="email" placeholder="email" />
    <p v-text="password"></p>
    <button @click="login"></button>
</div>
</template>
<script>
export default {
  name: "HelloWorldComponent",

  data() {
    return {
      email: "",
      password: "",
      logi: "",
    };
  },
  methods: {

    login() {
        this.$emit('login',{
            email: this.email,
            password: this.password,
            logi:this.logi
        })
    },
  },
};
</script>
