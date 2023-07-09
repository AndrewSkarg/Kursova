<template>
  <div v-if="!this.error">
    <HeaderComponent />

    <h1>Добавити страву</h1>
    <div class="create-post">
      <input
        type="text"
        id="post-title"
        v-model="title"
        placeholder="enter title"
      />
      <input
        type="text"
        id="post-desc"
        v-model="description"
        placeholder="enter description"
      />
      <input
        type="text"
        id="post portionForeign"
        v-model="portionForeign"
        placeholder="enter portion"
      />

      <input type="text" id="text" v-model="text" placeholder="enter text" />

      <button v-on:click="createPost">Post!</button>
    </div>

    <!-- in filteredDishes -->

    <h1>Страви:</h1>
    <transition>
      <span :key="text">{{ text }}</span>
    </transition>
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
          v-on:dblclick="dishInfo(dish.dish_id)"
        >
          <p class="kind" v-if="index === 'firstDishF'">перше</p>
          <p class="kind" v-if="index === 'secondDishF'">друге</p>
          <p class="kind" v-if="index === 'dessertDishF'">десерт</p>
          <p class="kind" v-if="index === 'saladDishF'">салат</p>
          <p class="kind" v-if="index === 'portionDrinkF'">напій</p>

          <p class="text">{{ dish.title }}</p>
        </div>
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

export default {
  components: {
    HeaderComponent,
  },
  data() {
    return {
      portions: [],
      breakfast: [],
      dinner: [],
      supper: [],
      error: "",
      title: "",
      text: "",
      description: "",
      portionForeign: "",
    };
  },
  async created() {
    try {
      this.portions = await PostService.getDishes(this.$route.path);
      this.breakfast = this.portions["сніданок"];
      this.dinner = this.portions["обід"];
      this.supper = this.portions["вечеря"];
    } catch (error) {
      this.error = error.message;
    }
  },
  methods: {
    async createDish() {
      try {
        await PostService.insertDish(
          this.title,
          this.description,
          this.portionForeign
        );
        this.dishes = await PostService.getDishes();
      } catch (error) {
        this.error = error.message;
      }
    },
    async dishInfo(id) {
      try {
        this.$router.push({ name: "dishInfo", params: { dishId: id } });
      } catch (error) {
        this.error = error.message;
      }
      // await PostService.changeDish(id);
      // this.dishes = await PostService.getDishes();
    },

    // computed: {
    //   filteredDishes() {
    //     console.log(this.$route.path);
    //     return this.dishes.filter(dish => dish.portionForeign === 1);
    //   }
    //  }

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
          //if(!groups[kind].dishes[])

          groups[kind].dishes.push(dish);
        });

        return Object.values(groups);
      },
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
</style>
