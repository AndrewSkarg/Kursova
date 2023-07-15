<template>
  <div v-if="this.authorized">
    <HeaderComponent />
  
  <div v-if="this.role==='шеф'" style="flex-direction: row;">
    <h1>Змінити назву</h1>
    <div>
        <input
          type="text"
          id="post-title"
          v-model="title"
          placeholder="enter title"
        />
        
    </div>

  </div>

      <h2>Компоненти страви</h2>
      <ul>
        <li
          v-for="component in selectedComponents"
          :key="component.component_id"
        >
        <div v-if="this.role==='шеф'">
          <button @click="removeComponent(component)" class="delete-button">
            ✕
          </button>
          <button @click="toggleEdit(component)" class="edit-button">✎</button>
        </div>
          <template v-if="component.editing">
            <input type="number" step="0.1" min="0" max="1" v-model="component.DishComponent.countOfComp"  />
          </template>
          <template v-else-if="component.DishComponent.countOfComp==='0' || parseFloat(component.DishComponent.countOfComp)>1 ">
            <label>(Введіть вірну кількість! ✎) {{ component.DishComponent.countOfComp='0' }}/{{ component.count }} {{ component.unit }}</label>
          </template>
          <template v-else>
            <label>{{ component.DishComponent.countOfComp }} <span v-if="this.role==='шеф'">/{{ component.count }} </span> {{ component.unit }}</label>
          </template>
          <span style="margin-inline: 1vw"> {{ component.title }} </span>
        </li>
      </ul>
  <br>
    <div v-if="this.role==='шеф'">
      <div  class="form-group">
        <label for="components">Вибір компонентів страви</label>
        <input
          type="text"
          v-model="searchText"
          id="components"
          placeholder="Пошук за назвою"
          style="min-width: 30vw; max-width: 60vw; min-height: 2vh"
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
              @change="updateDishComponents(component, $event.target.checked)"
              style="display: none"
            />

            {{ component.title }}
          </label>
        </div>
      </div>
      <button class="add-button" v-if="showAddButton" @click="toggleAddForm">
        {{ showAddForm ? 'Сховати форму' : '+' }}
      </button>
    
      <div v-if="showAddForm">
        <create-component-form @new-component="addNewComponent" />
      </div>
      <button class="add-button" @click="saveChanges">Зберегти зміни</button>
    </div>
  </div>
  <div v-else class="error">
    <p style="font-size: 3vw">Not authorized! {{ error }}</p>
    <p style="font-size: 2vw">Please <a href="/login">LOGIN</a></p>
  </div>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
import CreateComponentForm from "@/components/CreateComponentForm.vue";
import PostService from "../PostService";

export default {
  components: {
    HeaderComponent,
    CreateComponentForm,

  },
  data() {
    return {
      role:'',
      searchText: "",
      selectedComponents: [],
      components: [],
      error: "",
      title: "",
      compon: "",
      dishId:"",
      showAddForm: false,
      authorized:true

    };
  },
  async created() {
    this.dishId=   this.$route.params.dishId;

    try {
      const prof=await PostService.getProfile();
      this.role=prof.data.Roles[0].name;
      await this.getDishComponents();
      await this.getAllComponents();

    } catch (error) {
      this.error = error.response.status;
      this.error===401?this.authorized=false:this.authorized=true
    }
  },

  computed: {
    filteredComponents() {
      if (!this.searchText) {
        return this.components;
      } else {
        return this.components.filter((component) => {
          return component.title
            .toLowerCase()
            .includes(this.searchText.toLowerCase());
        });
      }
    },
    showAddButton() {
      return (
        this.searchText &&
        !this.components.some(
          (component) =>
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
    async saveChanges(){
     try{

// ...DishComponent{dishF: '9', componentF: 4, countOfComp: 0.2}
// component_id
// count
// description
// editing
// priceForUnit
// selected
// title
// unit


// eslint-disable-next-line
      //const {component_id,count,description,editing,priceForUnit,selected,title,unit,...selectedProps}=this.selectedComponents;

// eslint-disable-next-line
const modifiedArray = this.selectedComponents.map(({ component_id,count,description,editing,priceForUnit,selected,title,unit,...selectedProps }) => {return selectedProps.DishComponent});

await PostService.changeDish(this.dishId,this.title,modifiedArray);
console.log('SELECTED COMPONENTS: ',modifiedArray)

    }catch(err){
      this.error=err;
    }

    },

    async getAllComponents(){
      const valuesComp = await PostService.getComponents();
      this.components=valuesComp.map((component) => {
        return { ...component, DishComponent:{ ...component.DishComponent,"dishF": this.dishId, "componentF": component.component_id,"countOfComp": '0' }};});
      
      this.components = this.components.filter((component) => {
        return (
          !this.selectedComponents.some(
            (dishComponent) =>
              dishComponent.component_id === component.component_id
          ) &&
          component.description !== "фрукти" &&
          component.description !== "напої"
        );
      });    
},
    async getDishComponents(){
      const valDishComp = await PostService.getDishComponents(this.dishId);
      this.title = valDishComp.dishTitle;
  //DELETE           return { ...component,countOfComp: component.countOfComp, selected: true,   }; ///{ "dishF": 1, "componentF": 3, "countOfComp": "0.800" }  }

      this.selectedComponents = valDishComp.components_.map((component) => {
        return { ...component, selected: true,   }; ///{ "dishF": 1, "componentF": 3, "countOfComp": "0.800" }  }
      });
      // return  valDishComp;   

    },

    toggleEdit(component) {
      component.editing = !component.editing;
    },
    toggleAddForm() {
      this.showAddForm = !this.showAddForm;
    },



    isSelectedComponent(component) {
      return this.selectedComponents.includes(component.title);
    },

    updateDishComponents(component, checked) {
      console.log(component);
      console.log(checked);
     
      if (checked) {
        component.selected = true;
        if (
          !this.selectedComponents.some(
            (comp) => comp.component_id === component.component_id
          )
        ) {
          this.selectedComponents.push(component);
        }
      } else {
        component.selected = false;
        const index = this.selectedComponents.findIndex(
          (comp) => comp.component_id === component.component_id
        );
        if (index !== -1) {
          this.selectedComponents.splice(index, 1);
        }
      }
    },
    removeComponent(component) {
      const index = this.selectedComponents.findIndex(
        (comp) => comp.component_id === component.component_id
      );
      if (index !== -1) {
        const removedComponent = this.selectedComponents.splice(index, 1)[0];
        const isComponentPresent = this.components.some(
          (comp) => comp.component_id === component.component_id
        );

        if (!isComponentPresent) {
          this.components = [...this.components, removedComponent];
          const selectedIndex = this.selectedComponents.indexOf(
            removedComponent.title
          );
          if (selectedIndex !== -1) {
            this.selectedComponents.splice(selectedIndex, 1);
          }
        } else {
          removedComponent.selected = false;
        }
      }
    },

    async addNewComponent(newComponent) {


      if(!this.selectedComponents.some(comp=>comp.title.toLowerCase() === newComponent.title.toLowerCase())
            && !this.components.some(comp=>comp.title.toLowerCase() === newComponent.title.toLowerCase())){
          await PostService.insertComponent(newComponent.title,newComponent.count,
        newComponent.priceForUnit,newComponent.unit,newComponent.description);

          await this.getAllComponents();
      }else{
        alert('Уже існує дана складова')
      }
      
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
  content: "";
  position: absolute;
  top: 2px;
  left: 0;
  height: 18px;
  width: 18px;
  border: 2px solid red;

}

li {
  margin: 3vw;
  font-size: 17px;
  color:chocolate;
}

li template{
  font-size: 1vw;
}


.add-button {
  margin: 2vw;
  min-width: 5vw;
  font-size: 17px;
}
.edit-button,
.delete-button {
  margin-inline: 0.5vw;
}
</style>
