<template>
  <div v-if="this.authorized">
    <HeaderComponent />
  
  <div v-if="this.role==='шеф'" style="flex-direction: row;">
    <h1>Змінити назву</h1>
    <div>
        
        <h2>{{ selectedComponent.title }}</h2>
        
    </div>

  </div>

      
    <div v-if="this.role==='шеф'">
      <div  class="form-group">
        <label for="components">Вибір напою</label>
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
            :class="{ selected: isSelectedComponent(component) }"
          >
            <span class="checkmark" v-if="isSelectedComponent(component)"></span>
            <input
              type="checkbox"
              :id="component.component_id"
              :value="component.title"
              @click="()=>{this.selectedComponent.id=component.component_id; this.selectedComponent.title= component.title}"
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
      selectedComponent: { id:'', title:''},
      components: [],
      error: "",
      compon: "",
      drinkId:"",
      kind:'',
      showAddForm: false,
      authorized:true,
      dayNum:'',
      time:'',
      portion:'',
      dayName:''
    };
  },
  async created() {

    this.drinkId=   this.$route.params.drinkId;
    this.dayNum= this.$route.query.dayNum;
    this.dayName=this.$route.query.dayName;
    console.log(this.dayName);
    this.time= this.$route.query.time;
    this.selectedComponent.title=this.$route.query.drinkTitle;
    this.selectedComponent.id=this.$route.params.drinkId;
    console.log(this.dayNum);
    this.getDrinkPortion();

    try {
      const prof=await PostService.getProfile();
      this.role=prof.data.Roles[0].name;
    
      await this.getDrinkPortion();
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
   
  },

  methods: {


    async getDrinkPortion(){
       const portion= await PostService.getPortionByDayTime(this.dayNum,this.time);
        this.portion=portion;
    },


    async saveChanges(){
     try{
        await PostService.changePortionDrink(this.portion.portion_id,this.selectedComponent.id);

    }catch(err){
      this.error=err;
    }
        this.$router.push('/day/'+this.dayName)
    },

    async getAllComponents(){
      const valuesComp = await PostService.getComponents();
      
      this.components = valuesComp.filter((component) => {
        return (
          component.description ==='напої'
        );
      });    
},
    

    toggleEdit(component) {
      component.editing = !component.editing;
    },
    toggleAddForm() {
      this.showAddForm = !this.showAddForm;
    },



    isSelectedComponent(component) {
      return this.selectedComponent.id===component.component_id;
    },

    
    
    

    async addNewComponent(newComponent) {


      if(!this.components.some(comp=>comp.title.toLowerCase() === newComponent.title.toLowerCase())){
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
