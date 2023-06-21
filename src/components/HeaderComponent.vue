<template>
  <header>
    <!-- <router-link to="/login">login</router-link> -->
    <!-- <div id="logo">
      <router-link to="/" title="на головну"> <span>Г</span>оловна</router-link>
    </div>

    <div id="menuHead">
      <div>Про нас |</div>
      <div>зворотній звязок</div>
    </div>
    <div id="regAuth">
      <div>Реєстрація |</div>
      <div>авторизація</div>
    </div> -->
    <div class="panel">
      <div><router-link to="/"> Страви на сьогодні </router-link></div>
      <div><router-link to="/"> Прийоми їжі </router-link></div>
      <div><router-link to="/"> Меню </router-link></div>
      <div><router-link to="/"> Вихід </router-link></div>
    </div>
  </header>
</template>

<script>
export default {
  name: "HeaderComponent",
};
</script>

<style scoped>
/* @import url('https://fonts.googleapis.com/css2?family=Shantell+Sans:wght@300;600&display=swap'); */

@import url("https://fonts.googleapis.com/css2?family=Kurale&family=Shantell+Sans:wght@300;600&display=swap");

header {
  font-family: "Kurale", serif;

  font-size: 2vw;
  /* бо падінг 2 займає тому 98 */
  background-color: rgb(196, 188, 188);
  border-bottom: 2px solid rgb(5, 5, 5);
}

.panel {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
}
.panel div {

}

a {
  color: #bf771a;
}

/* header #logo {
  width: 40%;
  float: left;
}

header #logo span {
  color: aqua;
}

header #logo a {
  color: #949494;
  font-size: 2em;
  font-family: "Times New Roman", Times, sans-serif;
}

header #menuHead {
  width: 26%;
  float: left;
}

header #menuHead div{
  float: left;
  margin-right: 2%;
  border-radius: 10px;
  background-color: #949494;
  padding: 5px;
}


header #menuHead div:hover{
  background-color: aqua;
}

header #regAuth {
  width: 26%;
  float: left;
  text-align: right;
}

header #regAuth div {
  margin-right: 2%;
  float: left;
} */
</style>
