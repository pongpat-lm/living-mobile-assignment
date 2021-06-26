<template>
  <CategoryContent :name="name" :tableData="tableData" />
</template>

<script>
import CategoryContent from '../components/category/CategoryContent.vue'
export default {
  name: "category",
  components: {
    CategoryContent,
  },
  data() {
    return {
      name: "Category",
      tableData: [
        {
          date: "2016-05-03",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
        {
          date: "2016-05-02",
          name: "Tom",
          address: "No. 189, Grove St, Los Angeles",
        },
      ],
    };
  },
};
</script>

<style>
</style>