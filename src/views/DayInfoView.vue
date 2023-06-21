<template>
  <div>
    <HeaderComponent />
  </div>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent.vue";
export default {
  components: {
    HeaderComponent,
  },
  data() {
    return {
      error: "",
      title: "",
      description: "",
      portionForeign: "",
    };
  },
};
</script>
