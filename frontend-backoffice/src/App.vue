<template>
  <div id="app">
    <!-- <img src="./assets/logo.png" />
    <div>
      <p>
        If Element is successfully added to this project, you'll see an
        <code v-text="'<el-button>'"></code>
        below
      </p>
      <el-button>el-button</el-button>
    </div>
    <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <Home />

  </div>
</template>

<script>
// import HelloWorld from "./components/HelloWorld.vue";
import Home from "./components/Home.vue"

export default {
  name: "app",
  components: {
    // HelloWorld,
    Home
  },
};
</script>

<style>
#app {
  font-family: "Rubik", "Kanit", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
