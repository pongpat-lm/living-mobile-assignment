<template>
  <div class="container">
    <el-row class="header" type="flex" justify="space-between">
      <el-col class="name" :span="5">{{ name }}</el-col>
      <el-col class="button" :span="5"
        ><el-button
          type="primary"
          round
          icon="el-icon-plus"
          @click="toAdd"
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
            <el-button type="text" @click.native="toEdit"
              ><img
                src="../../assets/Edit.png"
                alt="edit"
                class="edit"
                @click="toEdit"
            /></el-button>
            <el-button type="text">
              <img src="../../assets/Copy.png" alt="copy" class="copy" />
            </el-button>
            <el-button type="text">
              <img src="../../assets/Delete.png" alt="delete" class="delete" />
            </el-button>
          </div>
        </el-table-column>
      </el-table>
    </div>
    <!-- edit-form -->
    <div class="edit-form" v-if="clickEditForm">
      <el-dialog title="Edit Category" :visible.sync="clickEditForm">
        <el-form :model="form" :rules="rules" ref="formEdit">
          <el-form-item
            label="Category name"
            :label-width="labelWidth"
            prop="name"
          >
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="Store name"
            :label-width="labelWidth"
            prop="storeName"
          >
            <el-select
              v-model="form.storeName"
              placeholder="Please select a zone"
            >
              <el-option label="Zone No.1" value="shanghai"></el-option>
              <el-option label="Zone No.2" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="text" @click="clickEditForm = false"
            >Cancel</el-button
          >
          <el-button type="primary" @click="submitForm('formEdit')" round
            >Edit Category</el-button
          >
        </span>
      </el-dialog>
    </div>
    <!-- add-form -->
    <div class="add-form" v-else-if="clickAddForm">
      <el-dialog title="Add Category" :visible.sync="clickAddForm">
        <el-form :model="form" :rules="rules" ref="formAdd">
          <el-form-item
            label="Category name"
            :label-width="labelWidth"
            prop="name"
          >
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="Store name"
            :label-width="labelWidth"
            prop="storeName"
          >
            <el-select
              v-model="form.storeName"
              placeholder="Please select a zone"
            >
              <el-option label="Zone No.1" value="shanghai"></el-option>
              <el-option label="Zone No.2" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="text" @click="clickAddForm = false"
            >Cancel</el-button
          >
          <el-button type="primary" @click="submitForm('formAdd')" round
            >Add Category</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "CategoryContent",
  components: {},
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
  data() {
    return {
      labelWidth: "120px",
      clickEditForm: false,
      clickAddForm: false,
      form: {
        name: "",
        storeName: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: "Please input Category name",
            trigger: "blur",
          },
          {
            min: 1,
            message: "This field should not be empty.",
            trigger: "blur",
          },
        ],
        storeName: {
          required: true,
          message: "Please Select Store name",
          trigger: "blur",
        },
      },
    };
  },
  methods: {
    toEdit() {
      this.clickAddForm = false;
      this.clickEditForm = true;
      console.log("click edit");
    },
    toAdd() {
      this.clickAddForm = true;
      this.clickEditForm = false;
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        console.log("valid");
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
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

.el-dialog__header {
  border-bottom: 1px solid #D9D9D9;
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