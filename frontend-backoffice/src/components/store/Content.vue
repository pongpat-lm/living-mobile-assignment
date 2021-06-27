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

    <!-- delete -->
    <div class="deleteAlert" v-if="clickDelete">
      <el-alert title="delete store success" type="error" center show-icon>
      </el-alert>
    </div>

    <!-- content -->
    <el-table
      :header-cell-style="{ background: '#F2F2F2' }"
      :data="$store.getters.tableData"
      style="width: 1078px"
      height="500"
    >
      <div slot="empty" style="color: red">Users is empty</div>
      <el-table-column prop="id" label="ID" width="200px"> </el-table-column>
      <el-table-column prop="name" label="Name" width="270px">
      </el-table-column>
      <el-table-column prop="description" label="Description" width="378px">
      </el-table-column>
      <el-table-column prop="rating" label="Rating" width="150px">
      </el-table-column>
      <el-table-column fixed="right" width="80px">
        <div>
          <el-button
            type="text"
            size="small"
            @click="toEdit"
            icon="el-icon-edit"
          ></el-button>
          <el-button
            type="text"
            size="small"
            @click="toDelete"
            icon="el-icon-delete"
          ></el-button>
        </div>
      </el-table-column>
    </el-table>

    <!-- createPage -->
    <div class="createPage" v-if="clickCreate">
      <el-dialog title="Add Store" :visible.sync="clickCreate">
        <el-form :model="form" :rules="rules" ref="createForm">
          <el-form-item
            label="Store name"
            :label-width="labelWidth"
            prop="name"
          >
            <el-input
              v-model="form.name"
              placeholder="please input your name"
              autocomplete="off"
              clearable
              style="width: 442px"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="Description"
            :label-width="labelWidth"
            prop="description"
          >
            <el-input
              v-model="form.description"
              placeholder="please input your description"
              autocomplete="off"
              clearable
              style="width: 442px"
            ></el-input>
          </el-form-item>
          <el-form-item label="rating" :label-width="labelWidth" prop="rating">
            <el-select
              v-model="form.rating"
              placeholder="please select your rating"
              style="width: 442px"
            >
              <el-option label="One star" value="1"></el-option>
              <el-option label="Two stars" value="2"></el-option>
              <el-option label="three stars" value="3"></el-option>
              <el-option label="Four stars" value="4"></el-option>
              <el-option label="Five stars" value="5"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="text" @click="clickCreate = false">Cancel</el-button>
          <el-button type="primary" @click="submitForm('createForm')" round
            >Add Store</el-button
          >
        </span>
      </el-dialog>
    </div>

    <!-- editPage -->
    <div class="editPage" v-if="clickEdit">
      <el-dialog title="Edit Store" :visible.sync="clickEdit">
        <el-form :model="form" :rules="rules" ref="editForm">
          <el-form-item
            label="Store name"
            :label-width="labelWidth"
            prop="name"
          >
            <el-input
              v-model="form.name"
              placeholder="please input your name"
              autocomplete="off"
              clearable
              style="width: 442px"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="Description"
            :label-width="labelWidth"
            prop="description"
          >
            <el-input
              v-model="form.description"
              placeholder="please input your description"
              autocomplete="off"
              clearable
              style="width: 442px"
            ></el-input>
          </el-form-item>
          <el-form-item label="Rating" :label-width="labelWidth" prop="rating">
            <el-select
              v-model="form.rating"
              placeholder="please select your rating"
              :label-width="labelWidth"
              style="width: 442px"
            >
              <el-option label="One star" value="1"></el-option>
              <el-option label="Two stars" value="2"></el-option>
              <el-option label="three stars" value="3"></el-option>
              <el-option label="Four stars" value="4"></el-option>
              <el-option label="Five stars" value="5"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="text" @click="clickEdit = false">Cancel</el-button>
          <el-button type="primary" @click="submitForm('editForm')" round
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
    tableData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      labelWidth: "100px",
      clickCreate: false,
      clickEdit: false,
      clickDelete: false,
      form: {
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
  created() {
    this.fetchStore();
  },
  methods: {
    toCreate() {
      this.clickCreate = true;
      this.clickEdit = false;
      this.clickDelete = false;
      console.log("click create");
    },
    toEdit() {
      this.clickCreate = false;
      this.clickEdit = true;
      this.clickDelete = false;
      console.log("click edit");
    },
    toDelete() {
      this.clickCreate = false;
      this.clickEdit = false;
      this.clickDelete = true;
      console.log("click delete");
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
    fetchStore() {
      this.$store.dispatch("fetchStore");
    },
    deleteStore(_id) {
      let payload = { _id: _id };
      this.$store.dispatch("deleteStore", payload);
    },
    openEdit(Store) {
      this.name = Store.name;
      this.description = Store.description;
      this.rating = Store.rating;
    },
    closeEdit() {
      this.name = "";
      this.description = "";
      this.rating = 0;
    },
    editStore(_id) {
      let payload = {
        index: this.editIndex,
        _id: _id,
        name: this.name,
        description: this.description,
        rating: this.rating,
      };
      this.$store.dispatch("editStore", payload).then(this.closeEdit());
    },
  },
};
</script>

<style>
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
  font-weight: 500;
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
}

.el-dialog__header {
  border-bottom: 1px solid #d9d9d9;
}
</style>