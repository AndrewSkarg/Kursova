<template>
  <div v-if="this.authorized">
    <HeaderComponent />
  <div v-if="this.role==='шеф'">
    <h1>Добавити страву</h1>
    <div class="create-post">
      <input
        type="text"
        id="add-title"
        v-model="newDish.title"
        placeholder="введіть назву"
        required
      />
      <select id="add-kind" v-model="newDish.kind">
        <option value="" disabled selected>Оберіть опис</option>
        <option value="перше">перше</option>
        <option value="друге">друге</option>
        <option value="салат">салат</option>
        <option value="десерт">десерт</option>
      </select>
      


      <button v-on:click="this.createDish()">Добавити!</button>  <span style="color: red;">{{isAddedDish}}</span> 
    </div>
</div>
    <!-- in filteredDishes -->

    <h1>Страви:</h1>
  
    <hr />
    <p class="error" v-if="error">{{ error }}</p>
    <div class="posts-container">
      <div class="column" v-for="(dishes, ind) in portions" :key="ind">
        <h2>{{ ind }}</h2>
        <div
          class="post"
          v-for="(dish, index) in dishes"
          v-bind:item="dish"
          v-bind:index="index"
          v-bind:key="dish.dish_id"
          v-on:click="dishInfo(dish.dish_id,index)"
        >
          <p class="kind" v-if="index === 'firstDishF'">перше</p>
          <p class="kind" v-if="index === 'secondDishF'">друге</p>
          <p class="kind" v-if="index === 'dessertDishF'">десерт</p>
          <p class="kind" v-if="index === 'saladDishF'">салат</p>
          <p class="kind" v-if="index === 'portionDrinkF'">напій</p>

          <p class="dishTitle">{{ dish.title }}</p>
        </div>
      </div>
    </div>
  </div>
<div v-else class="error">
  <p style="font-size: 3vw;">Not authorized! {{ error }}</p>
  <p style="font-size: 2vw;">Please <a href="/login">LOGIN</a></p>
</div>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import PostService from "../PostService";

export default {
  components: {
    HeaderComponent,
  },
  data() {
    return {
      newDish: {
        title: null,
        kind:""
      },
      role:'',
      portions: [],
      breakfast: [],
      dinner: [],
      supper: [],
      error: "",
      description: "",
      portionForeign: "",
      isAddedDish:"",
      authorized:true

    };
  },
  async created() {
    try {
      const prof=await PostService.getProfile();
      this.role=prof.data.Roles[0].name;
      this.portions = await PostService.getDishes(this.$route.path);      
    } catch (error) {
      this.error = error.response.status;
      this.error===401?this.authorized=false:this.authorized=true
      this.error===409?this.isAddedDish='Страва уже існує':0
    }
  },
  methods: {
    async createDish() {
      try {
      if(this.newDish.title && this.newDish.kind){
        await PostService.insertDish(
          this.newDish.title,
          this.newDish.kind
        );
        this.isAddedDish='Страва добавлена у список'
      }else{
        this.isAddedDish='Введіть усі дані'
      }
      } catch (error) {
        this.error = error.message;
      }
    },
    async dishInfo(id,index) {
      try {
        index!=='portionDrinkF'?this.$router.push({ name: "dishInfo", params: { dishId: id } }):0;
      } catch (error) {
        this.error = error.message;
      }
      
    },

  },

computed: {
      groupedDishes() {
        const groups = {};

        this.dishes.forEach((dish) => {
          const kind = dish.kind;

          if (!groups[kind]) {
            groups[kind] = {
              kind,
              dishes: [],
            };
          }

          groups[kind].dishes.push(dish);
        });

        return Object.values(groups);
      },
    },
};
</script>

<style ref scoped>
.posts-container {
  display: flex;
  justify-content: space-around;
  margin: 2vw;
}
.column h2 {
  margin: 0 0 1.5vw 0;
  font-size: 3vw;
}

.kind {
  margin: 0 0 0.5vw 0;
  font-size: 2.5vw;
}
.dishTitle{
  text-decoration-line: underline;
}
.dishTitle:hover{
  color: rgb(10, 72, 196);
  
}
</style>
