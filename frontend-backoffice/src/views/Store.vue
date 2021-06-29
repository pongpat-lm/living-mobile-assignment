<template>
  <Content :name="name" />
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

<style scroped>
</style>