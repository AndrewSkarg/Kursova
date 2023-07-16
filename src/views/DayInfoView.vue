<template>
  <div v-if="this.authorized">
    <HeaderComponent />
  <div v-if="this.role==='шеф'">
    <h1>Редагування страв</h1>
    <div class="create-post">
      

      <button type="button"><a href="/dishes-menu/">------Перейти до списку страв------</a></button>


    </div>
</div>
    <!-- in filteredDishes -->

    <h1>Страви:</h1>
  
    <hr />
    <p class="error" v-if="error">{{ error }}</p>
    <div class="posts-container">
      

      <div class="column" v-for="(time) in timeOfPortions" :key="time">
          <h2>{{ time==='breakfast'?'сніданок':time==='dinner'?'обід':time==='supper'?'вечеря':'' }}</h2>
            <p class="kind" >перше</p>
            <p class="dishTitle" :id="time+'-firstDishF'">----</p>

            <p class="kind">друге</p>
            <p class="dishTitle" :id="time+'-secondDishF'">----</p>

            <p class="kind">десерт</p>
            <p class="dishTitle" :id="time+'-dessertDishF'">----</p>

            <p class="kind" >салат</p>
            <p class="dishTitle" :id="time+'-saladDishF'">----</p>

            <p class="kind">напій</p>
            <p  class="dishTitle" :id="time+'-portionDrinkF'">----</p>

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
      timeOfPortions:['breakfast','dinner','supper'],

      title:null,
      kind:'',
      role:'',
      portions: [],
      breakfast: [],
      dinner: [],
      supper: [],
      error: "",
      description: "",
      portionForeign: "",
      authorized:true

    };
  },
  
  async created() {
    try {
      const prof=await PostService.getProfile();
      this.role=prof.data.Roles[0].name;
      this.portions = await PostService.getDishes(this.$route.path);
      await this.sortPortions();      
    } catch (error) {
      this.error = error.response.status;
      this.error===401?this.authorized=false:this.authorized=true
      this.error===409?this.isAddedDish='Страва уже існує':0
    }
  },
  methods: {
    async sortPortions(){
      

      for (const time in this.portions) {
            const kindOfDishes = Object.keys(this.portions[time]);
            console.log(time);
            kindOfDishes.forEach(fieldOfDishModel => {
              console.log(fieldOfDishModel);
              const element=document.getElementById(this.getTimeLabel(time)+'-'+fieldOfDishModel);
              element.textContent = this.portions[time][fieldOfDishModel].title;
              if(this.portions[time][fieldOfDishModel].kind!=='напої'){
                element.addEventListener('click',()=>{this.dishInfo(this.portions[time][fieldOfDishModel].dish_id)})
              }
            });
          //}

          // Виконувати операції з кожною властивістю
        
      }
      
    },

    getTimeLabel(time) {
      if (time === 'сніданок') {
        return 'breakfast';
      } else if (time === 'обід') {
        return 'dinner';
      } else {
        return 'supper';
      }
    },


// <div class="column" v-for="(dishes, ind) in portions" :key="ind">
//         <h2>{{ ind }}</h2>
//         <div
//           class="post"
//           v-for="(dish, index) in dishes"
//           v-bind:item="dish"
//           v-bind:index="index"
//           v-bind:key="dish.dish_id"
//           v-on:click="dishInfo(dish.dish_id,index)"
//         >
//           <p class="kind" v-if="index === 'firstDishF'">перше</p>
//           <p class="kind" v-if="index === 'secondDishF'">друге</p>
//           <p class="kind" v-if="index === 'dessertDishF'">десерт</p>
//           <p class="kind" v-if="index === 'saladDishF'">салат</p>
//           <p class="kind" v-if="index === 'portionDrinkF'">напій</p>

//           <p class="dishTitle">{{ dish.title }}</p>
//         </div>
//       </div>
    
    async dishInfo(id,index) {
      try {
        index!=='portionDrinkF'?this.$router.push({ name: "dishInfo", params: { dishId: id } }):0;
      } catch (error) {
        this.error = error.message;
      }
      
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
