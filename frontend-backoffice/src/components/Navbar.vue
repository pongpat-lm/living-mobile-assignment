<template>
  <el-row class="nav-bar">
    <el-col :span="3" class="logo"><img src="../assets/FoodStory_Logo.png" alt=""></el-col>
    <el-col :span="2" class="store click">Store</el-col>
    <el-col :span="2" class="category click">Category</el-col>
    <el-col :span="2" class="menu click">Menu</el-col>

  </el-row>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style>
.nav-bar {
    padding-left: 32px;
    background-color: #28B7FF;
    width: 100%;
    height: 60px;
    position: absolute;
    text-align: center;
    font-weight: bold;
    color: white;
    display: flex;
    align-items: center;
}

.click:hover {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 80%;
    background-color: white;
    color: #28B7FF;
    border-radius: 10px;
}
</style>