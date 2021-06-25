<template>
  <el-row class="nav-bar">
    <el-col :span="3" class="logo"
      ><img src="../assets/FoodStory_Logo.png" alt=""
    /></el-col>
    <el-col
      :span="2"
      class="store"
      @click.native="
        $router.push('/store');
        checkPath();
      "
      v-if="isStorePage"
      >Store</el-col
    >
    <el-col
      :span="2"
      class="click"
      @click.native="
        $router.push('/store');
        checkPath();
      "
      v-if="!isStorePage"
      >Store</el-col
    >
    <el-col
      :span="2"
      class="category"
      @click.native="
        $router.push('/category');
        checkPath();
      "
      v-if="isCategoryPage"
      >Category</el-col
    >
    <el-col
      :span="2"
      class="click"
      @click.native="
        $router.push('/category');
        checkPath();
      "
      v-if="!isCategoryPage"
      >Category</el-col
    >
    <el-col
      :span="2"
      class="menu"
      @click.native="
        $router.push('/menu');
        checkPath();
      "
      v-if="isMenuPage"
      >Menu</el-col
    >
    <el-col
      :span="2"
      class="click"
      @click.native="
        $router.push('/menu');
        checkPath();
      "
      v-if="!isMenuPage"
      >Menu</el-col
    >
  </el-row>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      isStorePage: false,
      isCategoryPage: false,
      isMenuPage: false,
    };
  },
  methods: {
    checkPath() {
      switch (this.$route.path) {
        case "/store":
          this.isStorePage = true;
          this.isCategoryPage = false;
          this.isMenuPage = false;
          break;
        case "/category":
          this.isStorePage = false;
          this.isCategoryPage = true;
          this.isMenuPage = false;
          break;
        case "/menu":
          this.isStorePage = false;
          this.isCategoryPage = false;
          this.isMenuPage = true;
          break;
        default:
          this.isStorePage = true;
          this.isCategoryPage = false;
          this.isMenuPage = false;
      }
    },
  },
  created() {
    this.checkPath();
  },
};
</script>

<style>
.nav-bar {
  padding-left: 32px;
  background-color: #28b7ff;
  width: 100%;
  height: 60px;
  position: absolute;
  text-align: center;
  font-weight: bold;
  color: white;
  display: flex;
  align-items: center;
}

.store {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 80%;
  background-color: white;
  color: #28b7ff;
  border-radius: 10px;
  cursor: pointer;
}

.category {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 80%;
  background-color: white;
  color: #28b7ff;
  border-radius: 10px;
  cursor: pointer;
}

.menu {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 80%;
  background-color: white;
  color: #28b7ff;
  border-radius: 10px;
  cursor: pointer;
}

.click:hover {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 80%;
  background-color: white;
  color: #28b7ff;
  border-radius: 10px;
  cursor: pointer;
}
</style>