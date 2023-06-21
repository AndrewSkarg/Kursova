<template>
  <div>
    <HeaderComponent/>
    <p>RegistrationView</p>
    <input type="text" v-model="email" placeholder="пошта" />
    <input type="text" v-model="password" placeholder="пароль" />
    <input type="text" v-model="firstName" placeholder="імя" />
    <input type="text" v-model="lastName" placeholder="прізвище" />


    <input @click="registerUser" type="submit" value="Зареєструватися">
  </div>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue';
import PostService from '../PostService';
export default {
  name: "RegistrationView",
  components: {
  HeaderComponent
},
  data() {
    return {
      email: "",
      password: "",
      firstName:'',
      lastName:''
    };
  },

  methods: {
    async registerUser() {
      //alert("child component said: " + this.email +' ' +this.password);
        await PostService.addUser(this.email,this.password,this.firstName,this.lastName);
    },
  },
};
</script>
