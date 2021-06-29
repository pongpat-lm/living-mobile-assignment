<template>
  <div class="container">
    <el-row class="header" type="flex" justify="space-between">
      <el-col class="name" :span="5">{{ name }}</el-col>
      <el-col class="button" :span="5"
        ><el-button type="primary" round icon="el-icon-plus" @click="toAdd"
          >Add New {{ name }}</el-button
        ></el-col
      >
    </el-row>
    <div>
      <el-table
        :header-cell-style="{ background: '#F2F2F2' }"
        :data="table"
        style="width: 100%"
      >
        <el-table-column prop="id" label="Id"> </el-table-column>
        <el-table-column prop="name" label="Name"> </el-table-column>
        <el-table-column prop="storeName" label="Store Name"></el-table-column>
        <el-table-column label=" ">
          <div slot-scope="scope" class="operation">
            <el-button type="text" @click.native="toEdit(scope.$index, table)"
              ><img src="../../assets/Edit.png" alt="edit" class="edit"
            /></el-button>
            <el-button type="text" @click.native="toCopy(scope.$index, table)">
              <img src="../../assets/Copy.png" alt="copy" class="copy" />
            </el-button>
            <el-button
              type="text"
              @click.native="toDelete(scope.$index, table)"
            >
              <img src="../../assets/Delete.png" alt="delete" class="delete" />
            </el-button>
          </div>
        </el-table-column>
      </el-table>
    </div>
    <!-- edit-form -->
    <div class="edit-form" v-if="clickEditForm">
      <el-dialog title="Edit Category" :visible.sync="clickEditForm">
        <el-form
          :label-position="labelPosition"
          :model="editForm"
          ref="formEdit"
          :rules="rules"
          class="form"
        >
          <el-form-item
            label="Category name"
            :label-width="labelWidth"
            prop="name"
          >
            <el-input v-model="editForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="Store name"
            :label-width="labelWidth"
            prop="storeId"
          >
            <el-select
              v-model="editForm.storeId"
              placeholder="Please Select Store name"
            >
              <el-option
                v-for="store in storeData"
                :key="store.id"
                :label="store.name"
                :value="store.id"
              ></el-option>
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
        <el-form
          :label-position="labelPosition"
          :model="addForm"
          :rules="rules"
          ref="formAdd"
          class="form"
        >
          <el-form-item
            label="Category name"
            :label-width="labelWidth"
            prop="name"
          >
            <el-input v-model="addForm.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="Store name"
            :label-width="labelWidth"
            prop="storeId"
          >
            <el-select
              v-model="addForm.storeId"
              placeholder="Please Select Store name"
            >
              <el-option
                v-for="store in storeData"
                :key="store.id"
                :label="store.name"
                :value="store.id"
              ></el-option>
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
  },
  data() {
    return {
      labelPosition: "top",
      table: [],
      storeData: [],
      categoryData: [],
      labelWidth: "120px",
      clickEditForm: false,
      clickAddForm: false,
      addForm: {
        name: "",
        storeId: "",
      },
      editForm: {
        name: "",
        storeId: "",
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
        storeId: {
          required: true,
          message: "Please Select Store name",
          trigger: "blur",
        },
      },
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      await this.$store.dispatch("fetchStores");
      await this.$store.dispatch("fetchCategories");
      this.storeData = this.$store.getters.storeData;
      this.categoryData = this.$store.getters.categories;
      this.categoryData.forEach((cat, index) => {
        if (cat.storeId) {
          let idx = this.storeData.findIndex((sto) => cat.storeId === sto.id);
          this.categoryData[index].storeName = this.storeData[idx].name;
        } else {
          this.categoryData[index].storeName =
            "***This store has been deleted***";
        }
      });
      this.table = this.categoryData;
    },
    toEdit(index, table) {
      this.clickAddForm = false;
      this.clickEditForm = true;
      this.editForm.id = table[index].id;
      this.editForm.name = table[index].name;
      this.editForm.storeId = table[index].storeId;
      console.log("click edit");
    },
    async toCopy(index, table) {
      this.addForm.name = table[index].name;
      this.addForm.storeId = table[index].storeId;
      await this.$store.dispatch("addCategory", this.addForm);
      await this.fetchData();
    },
    toDelete(index, table) {
      this.$confirm(
        "This will permanently delete the category. Continue?",
        "Warning",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning",
        }
      )
        .then(async () => {
          let data = table[index];
          await this.$store.dispatch("deleteCategory", data);
          await this.fetchData();
          this.$message({
            type: "success",
            message: "Delete completed",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Delete canceled",
          });
        });
    },
    toAdd() {
      this.clickAddForm = true;
      this.clickEditForm = false;
      (this.addForm.name = ""), (this.addForm.storeId = "");
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        console.log("valid");
        if (valid) {
          if (formName === "formAdd") {
            await this.$store.dispatch("addCategory", this.addForm);
            await this.fetchData();
            this.clickAddForm = false;
            return true;
          } else if (formName === "formEdit") {
            await this.$store.dispatch("editCategory", this.editForm);
            await this.fetchData();
            this.clickEditForm = false;
            return true;
          } else {
            return;
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
.container {
  padding: 30px 150px;
}
.form {
  font-weight: 600;
  padding: 0px 50px;
}
.header {
  margin-bottom: 20px;
}
.el-select {
  width: 100%;
}
.el-dialog__header {
  border-bottom: 1px solid #d9d9d9;
}
.el-dialog__title {
  font-weight: 600;
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