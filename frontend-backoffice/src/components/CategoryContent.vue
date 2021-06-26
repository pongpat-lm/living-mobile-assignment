<template>
  <div class="container">
    <el-row class="header" type="flex" justify="space-between">
      <el-col class="name" :span="5">{{ name }}</el-col>
      <el-col class="button" :span="5"
        ><el-button type="primary" round icon="el-icon-plus"
          >Add New {{ name }}</el-button
        ></el-col
      >
    </el-row>
    <div>
      <el-table
        :header-cell-style="{ background: '#F2F2F2' }"
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column prop="id" label="Id"> </el-table-column>
        <el-table-column prop="name" label="Name"> </el-table-column>
        <el-table-column prop="storeName" label="Store Name"></el-table-column>
        <el-table-column label=" ">
          <div class="operation">
            <img src="../assets/Edit.png" alt="edit" class="edit">
            <img src="../assets/Copy.png" alt="copy" class="copy">
            <img src="../assets/Delete.png" alt="delete" class="delete">
          </div>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "Content",
  props: {
    name: {
      type: String,
      default: "",
    },
    tableData: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style>
.container {
  padding: 30px 150px;
}

.header {
  margin-bottom: 20px;
}

.name {
  font-weight: bold;
  font-size: 30px;
  display: flex;
  align-items: center;
}

.button {
  display: flex;
  justify-content: flex-end;
}

.operation {
  padding: 0px 40px;
  display: flex;
  justify-content: space-evenly;
}

.operation > *:hover {
  opacity: 0.5;
}
</style>