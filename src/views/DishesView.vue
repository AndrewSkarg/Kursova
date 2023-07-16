<template>
  <div v-if="authorized">
    <HeaderComponent />
    <div v-if="role==='шеф'">
      <h1>Добавити/редагувати страву</h1>
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

        <select id="add-day" v-model="newDish.day">
          <option value="" disabled selected>Оберіть день(опціонально)</option>
          <option value="1">понеділок</option>
          <option value="2">вівторок</option>
          <option value="3">середа</option>
          <option value="4">четвер</option>
          <option value="5">пятниця</option>
          <option value="6">субота</option>
          <option value="7">неділя</option>

        </select>


        <select id="add-time" v-model="newDish.time">
          <option value="" disabled selected>Оберіть час прийому(опціонально)</option>
          <option value="сніданок">сніданок</option>
          <option value="обід">обід</option>
          <option value="вечеря">вечеря</option>
        </select>
        <button v-on:click="createDish()">Добавити!</button>
        <span style="color: red;">{{ isAddedDish }}</span>
      </div>
      <div>
        <h2>Сортувати за полем "kind":</h2>
        <label>
          <input
            type="radio"
            value=""
            v-model="sortOption"
          />
          Всі
        </label>
        <label v-for="option in sortOptions" :key="option">
          <input
            type="radio"
            :value="option"
            v-model="sortOption"
          />
          {{ option }}
        </label>
      </div>
      <div>
        <h2>Пошук за назвою:</h2>
        <input
          type="text"
          v-model="searchQuery"
          placeholder="Введіть назву страви"
        />
      </div>
      <div>
        <h2>Список страв:</h2>
        <ul>
          <li v-for="dish in filteredDishes" :key="dish.dish_id "  @click="handleDishClick(dish)">
            <div class="dish-info">
            <div  class="leftDiv">{{ dish.title }}</div> <div>{{ dish.kind }}</div>
            <button class="pig-trough" @click="deleteDish(dish.dish_id)">
             Віддати свиням 🐷
            </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>

.leftDiv:hover{
    min-width: 30vw;
    color: #820000;
    border: 1px solid orange;    
}

.leftDiv{
    min-width: 30vw;
}
.pig-trough {
  font-size: 24px;
  background-color: #fddfdf;
  border: none;
  border-radius: 50%;
  padding: 5px;
  margin-left: 50px;
  cursor: pointer;
  
}

.dish-info {
  display: flex;
  justify-content: space-between; /* Добавлено для размещения элемента справа */
}
</style>




<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import PostService from "../PostService";

export default {
  name: "DishesView",
  components: {
    HeaderComponent,
  },
  data() {
    return {
      newDish: {
        title: null,
        kind: "",
        day:"",
        time:""
      },
      role: "",
      error: "",
      authorized: true,
      isAddedDish: "",
      dishes: [
        // Ваши данные по стравам
      ],
      sortOption: "", // Поле для хранения выбранной опции сортировки
      searchQuery: "", // Поле для хранения строки поиска
    };
  },
  async created() {
    const prof = await PostService.getProfile();
    this.role = prof.data.Roles[0].name;
    this.getAllDishes();
  },
  computed: {
    filteredDishes() {
      // Фильтрация и сортировка страв
      let filtered = [...this.dishes];

      if (this.sortOption !== "") {
        filtered = filtered.filter((dish) => dish.kind === this.sortOption);
      }

      if (this.searchQuery !== "") {
        const searchLower = this.searchQuery.toLowerCase();
        filtered = filtered.filter((dish) =>
          dish.title.toLowerCase().includes(searchLower)
        );
      }

      return filtered;
    },
    sortOptions() {
      const options = [...new Set(this.dishes.map((dish) => dish.kind))];
      return options;
    },
  },
  methods: {

    async getAllDishes(){
        this.dishes = await PostService.getAllDishes();
    },
    async createDish() {
      try {
        if (this.newDish.title && this.newDish.kind) {
          const  inserted=await PostService.insertDish(
            this.newDish.title,
            this.newDish.kind
          );
          if(this.newDish.day!=="" && this.newDish.time!==""){
              console.log(inserted['dish'].dish_id);
              PostService.insertPortion(this.newDish.time,this.newDish.day,inserted['dish'].dish_id,this.newDish.kind);
          }
          this.isAddedDish = 'Страва добавлена у список';
          await this.getAllDishes();
        } else {
          this.isAddedDish = 'Введіть усі дані';
        }
      } catch (error) {
        this.error = error.response.status;
        this.authorized = this.error === 401 ? false : true;
        this.isAddedDish = this.error === 409 ? 'Страва уже існує' : '';
      }
    },
    async deleteDish(dishId) {
      console.log("Видалення з dish_id:", dishId);
      await PostService.removeDish(dishId);
      await this.getAllDishes();
    },

    handleDishClick(dish) {
      console.log("елемент:", dish);
      this.newDish.title=dish.title;
      this.newDish.kind= dish.kind;
      this.newDish.day='';//PostService.getPortions();
      this.newDish.time='сніданок';  //{ dayF: 3, portionDrinkF: 1, order: 'обід', firstDishF: 5, secondDishF: 6, dessertDishF: 12, saladDishF: 7 },

    },
  },
};
</script>