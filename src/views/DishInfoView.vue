<template>
  <div v-if="!error">
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
        <li v-for="component in selectedComponents" :key="component.component_id">
          <button @click="removeComponent(component)" class="delete-button">✕</button>
          <button @click="editCount(component)" class="edit-button">✎</button>
        <span style="margin-inline: 2vw;">  {{ component.title }} </span>


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
            :class="{ selected: component.selected }"
          >
            <span class="checkmark" v-if="component.selected"></span>
            <input
              type="checkbox"
              :id="component.component_id"
              :value="component.title"
              @change="updateDishComponents(component,$event.target.checked)"
              style="display: none"
            />


            

            {{ component.title }}
          </label>
        </div>
      </div>
      <button class="add-button" v-if="showAddButton" @click="addNewComponent" >+</button>
      <p>{{ selectedComponents }}</p>
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
      components: [],
      error: "",
      title: "",
      compon: "",
    };
  },
  async created() {
    try {
      const valDishComp = await PostService.getDishComponents(this.$route.params.dishId);
      const valuesComp = await PostService.getComponents();

      this.selectedComponents = valDishComp.components_.map((component)=>{ return {...component,selected:false}});
      this.components = valuesComp.filter((component) => {
        return (
          !this.selectedComponents.some(
            (dishComponent) =>
              dishComponent.component_id === component.component_id
          ) &&
          component.description !== "фрукти" &&
          component.description !== "напої"
        );
      });

      this.title = valDishComp.dishTitle;
    } catch (error) {
      this.error = error.message;
    }
  },

  computed: {
    filteredComponents() {
      if (!this.searchText) {
        return this.components;
      } else {
        return this.components.filter((component) => {
          return component.title.toLowerCase().includes(this.searchText.toLowerCase());
        });
      }
    },
    showAddButton() {
      return (
        this.searchText &&
        !this.components.some((component) =>
          component.title.toLowerCase() === this.searchText.toLowerCase()
        )
      );
    },
    // filteredComponentsWithSelectedStatus() {
    //   return this.filteredComponents.map((component) => {
    //     return {
    //       ...component,
    //       selected: this.isSelectedComponent(component),
    //     };
    //   });
    // },
  },

  methods: {
    addNewComponent() {
      const selectedComponentTitles = this.selectedComponents;
      const selectedComponents = this.components.filter((component) =>
        selectedComponentTitles.includes(component.title)
      );

      this.selectedComponents.push(...selectedComponents);
      this.selectedComponents = [];
    },
    isSelectedComponent(component) {
      return this.selectedComponents.includes(component.title);
    },

    updateDishComponents(component,checked) {
      console.log(component);
      console.log(checked);
      // if (this.isSelectedComponent(component)) {
      //   this.selectedComponents.push(component);
      // }
      if (checked) {
          component.selected=true;
          component.count="0";
          if (!this.selectedComponents.some((comp) => comp.component_id === component.component_id)) {
              this.selectedComponents.push(component);
            }
      }  
      else {
        component.selected=false;
        const index = this.selectedComponents.findIndex(
          (comp) => comp.component_id === component.component_id
        );
        if (index !== -1) {
          this.selectedComponents.splice(index, 1);
        }
      }
    },
    removeComponent(component) {
      const index = this.selectedComponents.findIndex((comp) => comp.component_id === component.component_id);
      if (index !== -1) {
        const removedComponent = this.selectedComponents.splice(index, 1)[0];
        const isComponentPresent = this.components.some((comp) => comp.component_id === component.component_id);

        if (!isComponentPresent) {
          this.components = [...this.components, removedComponent];
          const selectedIndex = this.selectedComponents.indexOf(removedComponent.title);
          if (selectedIndex !== -1) {
            this.selectedComponents.splice(selectedIndex, 1);
          }
        }else{
            removedComponent.selected=false;
        }
        
      }
    },



    editCount(component) {
      console.log(component)
    },
  },
};
</script>

<style scoped>
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

li {
  margin: 3vw;
  font-size: 2vw;
}

.add-button {
  margin: 2vw;
  min-width: 5vw;
  font-size: 5vw;
}
.edit-button, .delete-button{
margin-inline: 0.5vw;
}

</style>