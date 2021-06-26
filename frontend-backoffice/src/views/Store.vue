<template>
  <Content :name="name" :tableData="tableData" />
</template>

<script>
import Content from "../components/store/Content.vue";
export default {
  components: { Content },
  name: "store",
  data() {
    return {
      name: "Store",
      tableData: [
        {
          id: "2016-05-03",
          name: "Tom",
          description: "No. 189, Grove St, Los Angeles",
        },
        {
          id: "2016-05-02",
          name: "Tom",
          description: "No. 189, Grove St, Los Angeles",
        },
        {
          id: "2016-05-04",
          name: "Tom",
          description: "No. 189, Grove St, Los Angeles",
        },
        {
          id: "2016-05-01",
          name: "Tom",
          description: "No. 189, Grove St, Los Angeles",
        },
        {
          id: "2016-05-03",
          name: "Tom",
          description: "No. 189, Grove St, Los Angeles",
        },
        {
          id: "2016-05-02",
          name: "Tom",
          description: "No. 189, Grove St, Los Angeles",
        },
        {
          id: "2016-05-04",
          name: "Tom",
          description: "No. 189, Grove St, Los Angeles",
        },
        {
          id: "2016-05-01",
          name: "Tom",
          description: "No. 189, Grove St, Los Angeles",
        },
      ],
    };
  },
};
</script>

<style>
</style>