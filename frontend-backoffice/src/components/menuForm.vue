<template>
  <div>
    <el-button
      type="primary"
      size="medium"
      icon="el-icon-plus"
      round
      @click="dialogFormVisible = true"
    >
      Add New Menu
    </el-button>

    <el-dialog
      title="Add Menu"
      :visible.sync="dialogFormVisible"
      class="menu-title"
    >
      <el-form :model="form">
        <el-form-item :label="label.name" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item :label="label.categoryId" :label-width="formLabelWidth">
          <el-select
            v-model="form.categoryId"
            placeholder="Please select a Category"
            style="width: 100%"
          >
            <el-option
              v-for="item in form.categoryDataset"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="label.price" :label-width="formLabelWidth">
          <el-input
            type="number"
            v-model="form.price"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button class="btn-cance" @click="dialogFormVisible = false"
          >Cancel</el-button
        >
        <el-button type="primary" icon="el-icon-plus" @click="addMenu()" round
          >Add Menu</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "menuForm",
  props: {
    form: {
      type: Object,
      // default : function(){
      //     return `Just Bom ...`
      // }
      // validator: function(){
      //     return false;
      // }
    },
  },
  data() {
    return {
      label: {
        name: "Name",
        categoryId: "Category",
        price: "Price",
      },
      dialogFormVisible: false,
      formLabelWidth: "120px",
    };
  },
  mounted() {
    this.setCategotyDropdown();
    console.log(this.form)
  },
  methods: {
    setCategotyDropdown() {
      axios.get("http://localhost:3000/category").then((response) => {
        let categoryData = response.data;
        categoryData.forEach((val) => {
          this.form.categoryDataset.push({
            value: val.id,
            label: val.name,
          });
        });
      });
    },
    addMenu() {
      let formData = this.form;
      console.log(formData);
      if (this.checkForm(formData) == true) {
        axios
          .post("http://localhost:3000/menu", {
            categoryId: formData.categoryId,
            name: formData.name,
            price: parseFloat(formData.price),
          })
          .then((res) => {
            if (res.status == "201") {
              this.$root.$refs.index.setMenuTable();
              this.dialogFormVisible = false;
              this.resetForm();
            }
          })
          .catch((err) => {
            console.log(err.response);
          });
      }
    },
    resetForm() {
      this.form.categoryDataset = [];
      this.form.categoryId = "";
      this.form.name = "";
      this.form.price = "";
    },

    checkForm(data) {
      if (!data.name) {
        this.label.name = `Name *`;
      }

      if (!data.categoryId) {
        this.label.categoryId = `Category *`;
      }

      if (!data.price) {
        this.label.price = `Price *`;
      }

      if (!data.name || !data.categoryId || !data.price) {
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>
