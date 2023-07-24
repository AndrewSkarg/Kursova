<template>
  <div class="add-form">
    <h2>Додати компонент</h2>
    <div class="form-group">
      <label for="add-title">Назва</label>
      <input type="text" id="add-title"  v-model="newComponent.title" :class="{ 'error-field': !isTitleValid }" />
      <span class="error-message" v-if="!isTitleValid">Обов'язкове поле. Виберіть назву.</span>
    </div>
    <div class="form-group">
      <label for="add-count">Кількість на складі</label>
      <input type="number" id="add-count" v-model="newComponent.count" :class="{ 'error-field': !isCountValid }" />
      <span class="error-message" v-if="!isCountValid">Обов'язкове поле. Введіть кількість на складі від 0 до 999.999.</span>
    </div>
    <div class="form-group">
      <label for="add-price">Ціна за одиницю</label>
      <input type="number" id="add-price" v-model="newComponent.priceForUnit" :class="{ 'error-field': !isPriceValid }" />
      <span class="error-message" v-if="!isPriceValid">Обов'язкове поле. Введіть ціну за одиницю від 0 до 999.999.</span>
    </div>
    <div class="form-group">
      <label>Одиниця виміру</label>
      <div class="radio-group">
        <label>
          <input :class="{ 'error-field': !isUnitSelected }" type="radio" v-model="newComponent.unit" value="кг" /> кг
        </label>
        <label>
          <input :class="{ 'error-field': !isUnitSelected }" type="radio" v-model="newComponent.unit" value="л" /> л
        </label>
        <label>
          <input :class="{ 'error-field': !isUnitSelected }" type="radio" v-model="newComponent.unit" value="шт" /> шт
        </label>
      </div>
      <span class="error-message" v-if="!isUnitSelected">Оберіть одиницю виміру.</span>
    </div>
    <div class="form-group">
      <label for="add-description">Опис</label>
      <select id="add-description" v-model="newComponent.description" :class="{ 'error-field': !isDescriptionValid }">
        <option value="" disabled selected>Оберіть опис</option>
        <option value="крупи">крупи</option>
        <option value="овочі">овочі</option>
        <option value="фрукти">фрукти</option>
        <option value="напої">напої</option>
        <option value="інше">інше</option>
        <option value="спеції">спеції</option>
      </select>
      <span class="error-message" v-if="!isDescriptionValid">Оберіть опис компонента.</span>
    </div>
    <button @click="addNewComponent" :disabled="!isFormValid">Зберегти</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newComponent: {
        title: "",
        count: "",
        priceForUnit: "",
        unit: "",
        description: "",
      },
    };
  },
  computed: {
    isTitleValid() {
      return this.newComponent.title.length <= 20 && this.newComponent.title !== "";
    },
    isCountValid() {
      return (
        this.newComponent.count !== "" &&
        this.newComponent.count >= 0 &&
        this.newComponent.count <= 999.999
      );
    },
    isPriceValid() {
      return (
        this.newComponent.priceForUnit !== "" &&
        this.newComponent.priceForUnit >= 0 &&
        this.newComponent.priceForUnit <= 999.999
      );
    },
    isUnitSelected() {
      return this.newComponent.unit !== "";
    },
    isDescriptionValid() {
      return this.newComponent.description !== "";
    },
    isFormValid() {
      return (
        this.isTitleValid &&
        this.isCountValid &&
        this.isPriceValid &&
        this.isUnitSelected &&
        this.isDescriptionValid
      );
    },
  },
  methods: {
    addNewComponent() {
      if (this.isFormValid) {
        // Отримати дані нового компонента і передати їх до основного компонента
        this.$emit("new-component", this.newComponent);
        // Скинути дані форми
        this.resetForm();
        
      } else {
        this.validateForm();
      }
    },
    resetForm() {
      this.newComponent = {
        title: "",
        count: "",
        priceForUnit: "",
        unit: "",
        description: "",
      };
    },
    validateForm() {
      if (this.newComponent.title === "") {
        this.$set(this.newComponent, "title", "");
      }
      if (this.newComponent.count === "") {
        this.$set(this.newComponent, "count", "");
      }
      if (this.newComponent.priceForUnit === "") {
        this.$set(this.newComponent, "priceForUnit", "");
      }
      if (this.newComponent.unit === "") {
        this.$set(this.newComponent, "unit", "");
      }
      if (this.newComponent.description === "") {
        this.$set(this.newComponent, "description", "");
      }
    },
  },
};
</script>

<style scoped>
.add-form {
  margin-top: 3vw;
}

.error-field {
  border-color: red;
}

.error-message {
  color: red;
  font-size: 12px;
}

.radio-group {
  display: flex;
  gap: 1rem;
}
</style>
