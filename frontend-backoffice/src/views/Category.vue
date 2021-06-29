<template>
  <CategoryContent :name="name" />
</template>

<script>
import CategoryContent from "../components/category/CategoryContent.vue";
export default {
  name: "category",
  components: {
    CategoryContent,
  },
  data() {
    return {
      name: "Category",
    };
  },
};
</script>

<style>
</style>