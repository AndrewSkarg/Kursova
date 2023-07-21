<template>
  <div v-if="this.authorized">
    <HeaderComponent />
  <div v-if="this.role==='шеф'">
    <h1>Редагування страв</h1>
    <div class="create-post">
      

      <button class="styled-button">
          <a href="/dishes-menu/" class="button-link">Перейти до списку страв</a>
      </button>

    </div>
</div>
    <!-- in filteredDishes -->

    <h1>Страви:</h1>
  
    <hr />
    <p class="error" v-if="error">{{ error }}</p>
    <div class="posts-container" >
      
          <div class="column" v-for="(time) in timeOfPortions" :key="time">
              <h2>{{ time==='breakfast'?'сніданок':time==='dinner'?'обід':time==='supper'?'вечеря':'' }}</h2>
                <p class="kind" >перше</p>
                <p class="dishTitle" :id="time+'-firstDishF'">{{ empty }}</p>

                <p class="kind">друге</p>
                <p class="dishTitle" :id="time+'-secondDishF'">{{empty  }}</p>

                <p class="kind">десерт</p>
                <p class="dishTitle" :id="time+'-dessertDishF'">{{ empty }}</p>

                <p class="kind" >салат</p>
                <p class="dishTitle" :id="time+'-saladDishF'">{{empty  }}</p>

                <p class="kind">напій</p>
                <p  class="dishTitle" :id="time+'-portionDrinkF'">{{empty  }}</p>

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
      authorized:true,
      empty:"----",
    };
  },
  
  async created() {
    try {
      const prof=await PostService.getProfile();
      this.role=prof.data.Roles[0].name;
      this.portions = await PostService.getDishes(this.$route.path);

       this.sortPortions();
       this.addEventToAbsentDishes();     
    } catch (error) {
      
      this.error = error.response.status;
      this.error===401?this.authorized=false:this.authorized=true
      this.error===409?this.isAddedDish='Страва уже існує':0
    }
  },
  methods: {


// updateContainer() {
//       // Обновляем данные для класса контейнера
//       // Находим все элементы с классом "dishTitle"
//       const dishTitles = document.querySelectorAll(".dishTitle");

//       // Удаляем текст из каждого элемента с классом "dishTitle"
//       dishTitles.forEach((element) => {
//         element.textContent = "";
//       });
//     },

 
    getTranslatedDayToNumber(){
      const paramValue = this.$route.params;
      
        const dayTranslations = {
          mon: '1',
          tue: '2',
          wed: '3',
          thur: '4',
          fri: '5',
          sat: '6',
          sun: '7'
        };
        return dayTranslations[paramValue['name']];
    },

     addEventToAbsentDishes(){

const dishTitles = document.getElementsByClassName('dishTitle');

Array.from(dishTitles).forEach((dishTitle) => {
  const content = dishTitle.textContent.trim();

  if (content === this.empty) {
    dishTitle.addEventListener('click', async () => {
      const idValue=dishTitle.getAttribute('id');
      console.log('Clicked on ----', idValue);
      console.log(this.$route.params);
      
        let translatedValueDay = this.getTranslatedDayToNumber();
        console.log(translatedValueDay);

        let translatedValueTime = '';
        let translatedValueKind = '';


      if (idValue.includes('breakfast')) {
        translatedValueTime = 'сніданок';
      } else if (idValue.includes('dinner')) {
        translatedValueTime = 'обід';
      } else if (idValue.includes('supper')) {
        translatedValueTime = 'вечеря';
      }

      if (idValue.includes('firstDishF')) {
        translatedValueKind = 'перше';
      } else if (idValue.includes('secondDishF')) {
        translatedValueKind = 'друге';
      } else if (idValue.includes('dessertDishF')) {
        translatedValueKind = 'десерт';
      } else if (idValue.includes('saladDishF')) {
        translatedValueKind = 'салат';
      } else if (idValue.includes('portionDrinkF')) {
        translatedValueKind = 'напій';
      }
        await this.$router.push({
        path: '/dishes-menu/',
        query: {
          day: translatedValueDay,
          time: translatedValueTime,
          kind: translatedValueKind
        }
      });
    });
  }
});


    },


    async sortPortions(){
      
      

      for (const time in this.portions) {
            const kindOfDishes = Object.keys(this.portions[time]);
            console.log(time);
            kindOfDishes.forEach(fieldOfDishModel => {
              console.log(fieldOfDishModel);
              const element=document.getElementById(this.getTimeLabel(time)+'-'+fieldOfDishModel);
              let someDish=this.portions[time][fieldOfDishModel];
              element.textContent = someDish.title;
              if(someDish.kind==='напої'){
                  if(this.role==='шеф')
                    element.addEventListener('click',()=>{this.dishInfo(someDish.dish_id,'напій',this.getTranslatedDayToNumber(),time,someDish.title,this.$route.params.name)})
              }else{
                element.addEventListener('click',()=>{this.dishInfo(someDish.dish_id)})

              }
            });

        
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



    
    async dishInfo(id,kind,dayNum,time,drinkTitle,dayName) {
    console.log('kind: ',kind,' day: ',dayName,' time: ',time)
      try {
        kind!=='напій'?this.$router.push({ name: "dishInfo", params: { dishId: id } })
            :this.$router.push({ name: "drinkInfo", params: { drinkId: id },query:{dayNum:dayNum, time:time,drinkTitle:drinkTitle,dayName:dayName } });
      } catch (error) {
        this.error = error.message;
      }
      
    },

    


  },

};
</script>

<style ref scoped>

.styled-button {
  display: inline-block;
  border-radius: 30px;
  padding: 10px 20px;
  margin-top: 5px;
}

.button-link {
  text-decoration: none;
  color: #000000;
  font-size: 16px;
  font-weight: bold;
}

.button-link:hover {
  color: #9c9999;
}

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
