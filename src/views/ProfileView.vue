<template>
  <div class="home">
    <HeaderComponent />
    <div class="panel">
      YOU ARE IN PROFILE VIEW
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderComponent from "@/components/HeaderComponent.vue";
export default {
  name: "ProfileView",
  components: {
    HeaderComponent,
  },
};
</script>

<style scoped>

.home{
    word-wrap: break-word;

}
.rounded-div {
  border-radius: 10px;
  width:fit-content;
  padding: 2%;
  background-color:rgb(43, 226, 92) ;
}

.panel {
  font-size: 1.3vw;
  display: flex;
  justify-content: space-evenly;
}
</style>
