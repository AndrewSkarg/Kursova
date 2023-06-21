<template>
  <div class="home">
    <HeaderComponent />
    <div class="panel">
      <a class="rounded-div" href="/day/mon">Понеділок</a>
      <a class="rounded-div" href="/day/tue">Вівторок</a>
      <a class="rounded-div" href="/day/wed">Середа</a>
      <a class="rounded-div" href="/day/thur">Четвер</a>
      <a class="rounded-div" href="/day/fri">П'ятниця</a>
      <a class="rounded-div" href="/day/sat">Субота</a>
      <a class="rounded-div" href="/day/sun">Неділя</a>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HeaderComponent from "@/components/HeaderComponent.vue";
export default {
  name: "HomeView",
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
