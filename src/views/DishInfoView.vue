<template>
  <div v-if="!this.error">
    <HeaderComponent />
  
    <h1>Змінити назву</h1>
    <div class="create-post">
      <input
        type="text"
        id="post-title"
        v-model="title"
        placeholder="enter title"
      />
      <h2>Компоненти страви</h2>
          <ul>
            <li v-for="component in dishComponents" :key="component.component_id">
              <span>{{ component.title }}</span>
              <button @click="removeComponent(component)" class="delete-button">✕</button>
              <button @click="editCount(component)" class="edit-button">✎</button>
            </li>
          </ul>

        <div class="form-group">
                <label for="components">Вибір компонентів страви</label>
                <input
                  type="text"
                  v-model="searchText"
                  placeholder="Пошук за назвою"
                  style="min-width: 200px; min-height: 30px"
                />
                <div class="checkbox-list">
                  <label
                    v-for="component in filteredComponents"
                    :key="component.component_id"
                    :class="{ 'selected': isSelectedComponent(component) }"
                  >
                    <span
                      class="checkmark"
                      v-if="isSelectedComponent(component)"
                    ></span>
                    <input
                      type="checkbox"
                      :id="component.component_id"
                      :value="component.title"
                      v-model="selectedComponents"
                      style="display: none;"
                    />
                    {{ component.title }}
                  </label>

        </div>
  <button v-if="showAddButton" @click="addNewComponent" style="font-size: 5vw;">+</button>
</div>





      <p>{{ dishComponents }}</p>
    </div>
  </div>
  <div v-else class="error">
    <p style="font-size: 3vw">Not authorized! {{ error }}</p>
    <p style="font-size: 2vw">Please <a href="/login">LOGIN</a></p>
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
      searchText: "",
      selectedComponents: [],
      dishComponents: [],
      components: [],
      error: "",
      title: "",
      compon: "",
    };
  },
  async created() {
    //axios.get(`/api/dish-components/${dishId}`)
    try {
      const valuesComp = await PostService.getComponents();

      console.log('check ',valuesComp)

      this.components=valuesComp.filter(component => {
        return component.description !== "фрукти" && component.description !== "напої";
      });


      const valDishComp = await PostService.getDishComponents(
        this.$route.params.dishId
      );

      this.dishComponents=valDishComp.components_;

      this.title=valDishComp.dishTitle;
      console.log('value ', valDishComp.dishTitle);
    } catch (error) {
      this.error = error.message;
    }
  },

 computed: {
  filteredComponents() {
    if (!this.searchText) {
      return this.components;
    } else {
      return this.components.filter(component => {
        return component.title.toLowerCase().includes(this.searchText.toLowerCase());
      });
    }
  },
  showAddButton() {
    return (
      this.searchText &&
      !this.components.some(component =>
        component.title.toLowerCase() === this.searchText.toLowerCase()
      )
    );
  },
},
methods: {
  addNewComponent() {
    // Додайте код для додавання нового компонента
  },
  isSelectedComponent(component) {
    return this.selectedComponents.includes(component.title);
  },
},
};
</script>

<style  scoped>

.checkbox-list {
  overflow-y: auto;
  max-height: 150px;
}

.checkbox-list label {
  display: block;
  position: relative;
  padding-left: 25px;
  cursor: pointer;
}

.checkbox-list .checkmark {
  position: absolute;
  top: 2px;
  left: 0;
  height: 18px;
  width: 18px;
  background-color: red;
}

.checkbox-list label.selected .checkmark {
  display: block;
}

.checkbox-list label.selected::before {
  content: '';
  position: absolute;
  top: 2px;
  left: 0;
  height: 18px;
  width: 18px;
  border: 2px solid red;
}

.checkbox-list input[type="checkbox"],
.checkbox-list label {
  vertical-align: middle;
}

</style>
