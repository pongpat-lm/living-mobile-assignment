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
      tableData: [],
    };
  },
};
</script>

<style>
</style>