<template>

  <div v-if="!this.error" class="home">
    <HeaderComponent />
    <div class="panel"><h1>Ваші особисті дані</h1></div><br>
    <p>Звання: <span class="profData">{{rank}}</span></p><br>
    <p>Ім'я: <span class="profData">{{firstName}}</span></p><br>
    <p>Прізвище: <span class="profData">{{lastName}}</span></p><br>
    <p>Роль: <span class="profData">{{whoInCanteen}}</span></p><br>
    <p>Посада: <span class="profData">{{position}}</span></p><br>
  </div>
  <div v-else class="error" style="font-size: 10vw;">Not authorized! <a href="/login"> LOGIN</a></div>
</template>

<script>
// @ is an alias to /src
import HeaderComponent from "@/components/HeaderComponent.vue";
import PostService from "../PostService";

export default {
  name: "ProfileView",
  components: {
    HeaderComponent,
  },
  data() {
    return {
      error:"",
      profile: {},
      rank:"",
      firstName:"",
      lastName:"",
      whoInCanteen:"", //name in Role
      position:""   //title in Position
    };
  },
// profile:Reactive
// firstName:""
// lastName:""
// email:"skargandrew@gmail.co"
// password:"$2b$10$z4gjjsv7KL.XC1kUU7Q2quaBeRWxVUvryVrOWySloVq8HO.J0/we2"
// Roles:Array[1]
// 0:Object
// UserRole:Object
// name:"споживач"
// Position:Object
// rank:"солдат"
// title:"курсант"
// user:35

  async created() {
    try {
      const prof=await PostService.getProfile();
      this.profile = prof.data;
      this.firstName=this.profile.firstName;
      this.lastName=this.profile.lastName;
      this.whoInCanteen=this.profile.Roles[0].name;
      this.position=this.profile.Position.title;
      this.rank=this.profile.Position.rank;

    } catch (error) {
      this.error = error.message;
    }
  },
};
</script>

<style scoped>
.home {
  word-wrap: break-word;
}
.rounded-div {
  border-radius: 10px;
  width: fit-content;
  padding: 2%;
  background-color: rgb(43, 226, 92);
}
.profData{
  margin-left: 10vw;
  
}

p{
  margin-inline-start: 1vw;
}
.panel {
  font-size: 1.3vw;
  display: flex;
  justify-content: space-evenly;
}
</style>
