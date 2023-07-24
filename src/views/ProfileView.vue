<template>
  <div v-if="!error" class="home">
    <HeaderComponent />
      <h1 style="margin-left: 2vw;">Ваші особисті дані</h1>
    <br>
    <div class="profile-wrapper">
      <div class="profile-picture">
          <img :src="getRankImage(rank)" alt="Зображення збоку" />
      </div>
      <div class="profile-data">
        <p><span class="label">Звання:</span> <span class="profData">{{ rank }}</span></p><br>
        <p><span class="label">Ім'я:</span> <span class="profData">{{ firstName }}</span></p><br>
        <p><span class="label">Прізвище:</span> <span class="profData">{{ lastName }}</span></p><br>
        <p><span class="label">Роль:</span> <span class="profData">{{ role }}</span></p><br>
        <p><span class="label">Посада:</span> <span class="profData">{{ position }}</span></p><br>
        <p v-if="position.toLowerCase() === 'курсант'"><span class="label">Факультет:</span> <span class="profData">{{ faculty }}</span></p><br>
      </div>
    </div>
  </div>
<div v-else class="error">
  <p style="font-size: 3vw;">Not authorized!</p>
  <p style="font-size: 2vw;">Please <a href="/login">LOGIN</a></p>
</div>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import PostService from "../PostService";
import soldier from '../assets/img/soldier.jpg'
import sergeant from '../assets/img/sergeant.jpg'
import lieutenant from '../assets/img/lieutenant.jpg'
import major from '../assets/img/major.jpg'
import lieutenant_colonel from '../assets/img/lieutenant_colonel.jpg'
import colonel from '../assets/img/colonel.jpg'

export default {
  name: "ProfileView",
  components: {
    HeaderComponent,
  },
  data() {
    return {
      error: "",
      profile: {},
      rank: "",
      firstName: "",
      lastName: "",
      role: "",
      position: "",
      faculty: "",
      soldier,sergeant,lieutenant,major,lieutenant_colonel,colonel
    };
  },
  async created() {
    try {
      const prof = await PostService.getProfile();
      this.profile = prof.data;
      this.firstName = this.profile.firstName;
      this.lastName = this.profile.lastName;
      this.role = this.profile.Roles[0].name;
      this.position = this.profile.Position.title;
      this.rank = this.profile.Position.rank;
      this.faculty = '2';
    
    } catch (error) {
      this.error = error.message;
    }
  },
  methods: {


    getRankImage(rank) {
      switch (rank) {
        case 'солдат':
          return '../assets/img/soldier.jpg';
        case 'сержант':
          return '../assets/img/sergeant.jpg';
        case 'лейтенант':
          return '../assets/img/lieutenant.jpg';
        case 'майор':
          return '../assets/img/major.jpg';
        case 'підполковник':
          return '../assets/img/lieutenant_colonel.jpg';
        case 'полковник':
          return '../assets/img/colonel.jpg';
        default:
          return '';
      }
    },
  },
};
</script>

<style scoped>
.home {
  
  word-wrap: break-word;
}


.profData {
  margin-left: 1rem;
}

.label {
  display: inline-block;
  width: 7rem;
  font-weight: bold;
}

.panel {
  font-size: 1.3vw;
  display: flex;
  justify-content: space-evenly;
}

.profile-wrapper {
  display: flex;
  align-items: center;
  margin-top: 2rem;
}

.profile-picture {
  margin-right: 2rem;
}

.profile-picture img {
  margin-left: 3vw;
  width: 150px;
  height: auto;
}

.profile-data {
  font-size: 1.2rem;
}
</style>
