<template>
  <div>
    <!-- header -->
    <el-row class="contrainer" type="flex" justify="space-between">
      <el-col class="topic" :span="6">{{ name }}</el-col>
      <el-col class="add" :span="6"
        ><el-button
          type="primary"
          round
          icon="el-icon-plus"
          class="press"
          @click="toCreate"
          >Add New {{ name }}</el-button
        ></el-col
      >
    </el-row>

    <!-- content -->
    <el-table
      :header-cell-style="{ background: '#F2F2F2' }"
      :data="Data"
      style="width: 1078px"
      height="500"
    >
      <div slot="empty" style="color: red">Users is empty</div>
      <el-table-column prop="id" label="ID" width="290px"> </el-table-column>
      <el-table-column prop="name" label="Name" width="200px">
      </el-table-column>
      <el-table-column prop="description" label="Description" width="348px">
      </el-table-column>
      <el-table-column prop="rating" label="Rating" width="120px">
      </el-table-column>
      <el-table-column width="120px">
        <div slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="toEdit(scope.$index, Data)"
            ><img src="../../assets/Edit.png"
          /></el-button>
          <el-button
            type="text"
            size="small"
            @click="copyStore(scope.$index, Data)"
            ><img src="../../assets/Copy.png"
          /></el-button>
          <el-button
            type="text"
            size="small"
            @click="deleteStore(scope.$index, Data)"
            ><img src="../../assets/Delete.png"
          /></el-button>
        </div>
      </el-table-column>
    </el-table>

    <!-- createPage -->
    <div class="createPage" v-if="clickCreate">
      <el-dialog title="Add Store" :visible.sync="clickCreate">
        <el-form
          :model="AddForm"
          :rules="rules"
          :label-width="labelWidth"
          label-position="top"
          ref="createForm"
        >
          <el-form-item label="Store name" prop="name">
            <el-input
              v-model="AddForm.name"
              placeholder="please input your name"
              autocomplete="off"
              clearable
              style="width: 442px"
            ></el-input>
          </el-form-item>
          <el-form-item label="Description" prop="description">
            <el-input
              v-model="AddForm.description"
              placeholder="please input your description"
              autocomplete="off"
              clearable
              style="width: 442px"
            ></el-input>
          </el-form-item>
          <el-form-item label="Rating" prop="rating">
            <el-select
              v-model="AddForm.rating"
              placeholder="please select your rating"
              style="width: 442px"
            >
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
              <el-option label="3" value="3"></el-option>
              <el-option label="4" value="4"></el-option>
              <el-option label="5" value="5"></el-option>
              <el-option label="6" value="6"></el-option>
              <el-option label="7" value="7"></el-option>
              <el-option label="8" value="8"></el-option>
              <el-option label="9" value="9"></el-option>
              <el-option label="10" value="10"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="text" @click="clickCreate = false">Cancel</el-button>
          <el-button
            type="primary"
            @click="
              submitForm('createForm');
              addStore();
            "
            round
            >Add Store</el-button
          >
        </span>
      </el-dialog>
    </div>

    <!-- editPage -->
    <div class="editPage" v-if="clickEdit">
      <el-dialog title="Edit Store" :visible.sync="clickEdit">
        <el-form
          :model="EditForm"
          :rules="rules"
          :label-width="labelWidth"
          label-position="top"
          ref="editForm"
        >
          <el-form-item label="Store name" prop="name">
            <el-input
              v-model="EditForm.name"
              placeholder="please input your name"
              autocomplete="off"
              clearable
              style="width: 442px"
            ></el-input>
          </el-form-item>
          <el-form-item label="Description" prop="description">
            <el-input
              v-model="EditForm.description"
              placeholder="please input your description"
              autocomplete="off"
              clearable
              style="width: 442px"
            ></el-input>
          </el-form-item>
          <el-form-item label="Rating" :label-width="labelWidth" prop="rating">
            <el-select
              v-model="EditForm.rating"
              placeholder="please select your rating"
              style="width: 442px"
            >
              <el-option label="1" value="1"></el-option>
              <el-option label="2" value="2"></el-option>
              <el-option label="3" value="3"></el-option>
              <el-option label="4" value="4"></el-option>
              <el-option label="5" value="5"></el-option>
              <el-option label="6" value="6"></el-option>
              <el-option label="7" value="7"></el-option>
              <el-option label="8" value="8"></el-option>
              <el-option label="9" value="9"></el-option>
              <el-option label="10" value="10"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="text" @click="clickEdit = false">Cancel</el-button>
          <el-button
            type="primary"
            @click="
              submitForm('editForm');
              editStore();
            "
            round
            >Edit Store</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
export default {
  name: "store",
  props: {
    name: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      storeTable: [],
      Data: [],
      editId: "",
      editIndex: "",
      delId: "",
      labelWidth: "100px",
      clickCreate: false,
      clickEdit: false,
      AddForm: {
        name: "",
        description: "",
        rating: "",
      },
      EditForm: {
        name: "",
        description: "",
        rating: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: "Please input Store name",
            trigger: "blur",
          },
          {
            min: 1,
            message: "This field should not be empty.",
            trigger: "blur",
          },
        ],
      },
    };
  },
  async created() {
    await this.fetchStore();
  },
  methods: {
    toCreate() {
      this.clickCreate = true;
      this.clickEdit = false;
      this.AddForm.name = "";
      this.AddForm.description = "";
      this.AddForm.rating = "";
      console.log("click create");
    },
    toEdit(index, table) {
      this.EditForm.name = table[index].name;
      this.EditForm.description = table[index].description;
      this.EditForm.rating = table[index].rating;
      this.clickCreate = false;
      this.clickEdit = true;
      this.editIndex = index;
      this.editId = table[index].id;
      console.log("click edit");
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        console.log("valid");
        if (!valid) {
          console.log("error submit!!");
          return false;
        }
      });
    },
    async copyStore(index, table) {
      let Value = {
        name: table[index].name,
        description: table[index].description,
        rating: parseInt(table[index].rating),
      };
      await this.$store.dispatch("addStore", Value);
      await this.fetchStore();
    },
    async fetchStore() {
      await this.$store.dispatch("fetchStore");
      this.Data = await this.$store.getters.storeData;
    },
    deleteStore(index, table) {
      const Value = {
        id: table[index].id,
        index: index,
      };
      this.$confirm(
        "This will permanently delete the file. Continue?",
        "Warning",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning",
        }
      )
        .then(() => {
          this.$message({
            type: "success",
            message: "Delete completed",
          });
          this.$store.dispatch("deleteStore", Value);
          this.fetchStore();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Delete canceled",
          });
        });
    },
    async addStore() {
      let Value = {
        name: this.AddForm.name,
        description:
          this.AddForm.description || "description of " + this.AddForm.name,
        rating: parseInt(this.AddForm.rating) || 0,
      };
      await this.$store.dispatch("addStore", Value);
      await this.fetchStore();
    },
    async editStore() {
      let Value = {
        id: this.editId,
        index: this.editIndex,
        name: this.EditForm.name,
        description:
          this.EditForm.description || "description of " + this.AddForm.name,
        rating: parseInt(this.EditForm.rating),
      };
      await this.$store.dispatch("editStore", Value);
      await this.fetchStore();
    },
  },
};
</script>

<style scroped>
.contrainer {
  display: flex;
}

.topic {
  color: #231f20;
  position: absolute;
  width: 90px;
  height: 44px;
  left: 171px;
  top: 32px;
  font-style: normal;
  font-weight: 600;
  font-size: 34px;
  line-height: 44px;
  letter-spacing: -0.25px;
}

.press {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 24px;
  background-color: #28b7ff;
  border: none;
  position: absolute;
  width: 188px;
  height: 44px;
  left: 1063px;
  top: 29px;
}

.add {
  position: static;
  height: 28px;
  left: 52px;
  right: 24px;
  top: calc(50% - 28px / 2);
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 28px;
  text-align: center;
  letter-spacing: 0.1px;
  color: #ffffff;
  flex: none;
  order: 1;
  flex-grow: 0;
  margin: 0px 4px;
}

.el-table {
  position: absolute;
  left: 171px;
  top: 150px;
  font-style: normal;
  font-weight: 300;
  font-size: 14px;
  line-height: 20px;
  color: #231f20;
}

.el-dialog {
  width: 612px;
  height: 401px;
  border-radius: 8px;
}

.el-dialog__header {
  border-bottom: 1px solid #d9d9d9;
}

.el-dialog__title {
  font-style: normal;
  font-weight: 600;
}

.el-dialog__body {
  padding: 10px 80px;
}

.el-dialog__footer {
  padding: 10px 90px 20px;
}

.el-form--label-top .el-form-item__label {
  padding: 0;
}

.el-form-item {
  margin-bottom: 5px;
}

.el-form-item__label {
  color: #231f20;
  font-style: normal;
  font-weight: 600;
}
</style>