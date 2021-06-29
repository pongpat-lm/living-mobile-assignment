<template>
  <el-row class="nav-bar">
    <el-col :span="3" class="logo"
      ><img src="../assets/FoodStory_Logo.png" alt="Food Story Logo"
    /></el-col>
    <el-col
      :span="2"
      class="store button"
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
      class="category button"
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
      class="menu button"
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

<style scroped>
.nav-bar {
  padding-left: 32px;
  background-color: #28b7ff;
  width: 1440px;
  height: 60px;
  position: absolute;
  text-align: center;
  font-weight: bold;
  color: white;
  display: flex;
  align-items: center;
  box-shadow: 0px 60px 116px rgba(0, 0, 0, 0.022),
    0px 25.0666px 48.462px rgba(0, 0, 0, 0.019),
    0px 13.4018px 25.9101px rgba(0, 0, 0, 0.015),
    0px 7.51293px 14.525px rgba(0, 0, 0, 0.025),
    0px 3.99006px 7.71412px rgba(0, 0, 0, 0.015),
    0px 1.66035px 3.21002px rgba(0, 0, 0, 0.01);
}

.button {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 40px;
  background-color: white;
  color: #28b7ff;
  border-radius: 12px;
  padding: 8px 16px;
  cursor: pointer;
}

.click:hover {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 40px;
  background-color: white;
  color: #28b7ff;
  border-radius: 12px;
  padding: 8px 16px;
  cursor: pointer;
}
</style>