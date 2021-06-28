<template>
  <el-row type="flex" justify="space-around">
    <el-col :span="18">
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <p class="title">Menu</p>
          </div>
        </el-col>
        <el-col :span="6" :offset="12">
          <div class="grid-content bg-purple">
            <menuForm :form="form" class="m-form"></menuForm>
          </div>
        </el-col>
      </el-row>

      <data-tables class="menu-table" :data="tableData" :total="100">
        <el-table-column label="ID" prop="id" sortable="custom">
        </el-table-column>
        <el-table-column label="Category" prop="categoryName" sortable="custom">
        </el-table-column>
        <el-table-column label="Name" prop="name" sortable="custom">
        </el-table-column>
        <el-table-column label="Price" prop="price" sortable="custom">
        </el-table-column>
        <!-- <el-table-column fixed="right">
            <el-button type="text" size="small">Edit</el-button>
            <el-button type="text" size="small">Copy</el-button>
            <el-button type="text" size="small"  @click="deleteMenu(id)">Delete</el-button>
    </el-table-column> -->

        <el-table-column fixed="right">
          <template slot-scope="scope">
            <!-- <el-button type="text" size="small" @click="handleMenuEdit(scope.$index, scope.row)">
          Edit 
        </el-button> -->

            <menuEditForm :form="scope.row"> </menuEditForm>
            <el-col :span="3">
              <el-button
                type="text"
                size="small"
                class="icon-color"
                @click="handleMenuCopy(scope.$index, scope.row)"
                icon="el-icon-copy-document"
              >
                <!-- Copy  -->
              </el-button>
            </el-col>
            <el-col :span="3">
              <el-button
                type="text"
                size="small"
                class="icon-color"
                @click="handleMenuDelete(scope.$index, scope.row)"
                icon="el-icon-delete"
              >
                <!-- Delete  -->
              </el-button>
            </el-col>
          </template>
        </el-table-column>
      </data-tables>
    </el-col>
  </el-row>
</template>

<script>
import axios from "axios";
import menuForm from "../components/menuForm.vue";
import menuEditForm from "../components/menuEditForm.vue";

export default {
  name: "Menu",
  components: {
    menuForm,
    menuEditForm,
  },
  data() {
    return {
      //  dialogFormVisible: false,
      form: {
        categoryDataset: [],
        categoryId: "",
        name: "",
        price: "",
      },
      formLabelWidth: "120px",
      tableHeader: {
        t_id: "id",
        t_category: "category",
        t_name: "name",
        t_price: "price",
      },
      tableData: [],
      categoryData: [],
    };
  },

  created() {
    this.$root.$refs.index = this;
  },
  async mounted() {
    this.setMenuTable();
  },
  methods: {
    setMenuTable() {
      axios
        .get("http://localhost:3000/category")
        .then((response) => {
          this.categoryData = response.data;
        })
        .then(() => {
          axios.get("http://localhost:3000/menu").then((response) => {
            let menuData = response.data;
            menuData.forEach((menu, index) => {
              let idx = this.categoryData.findIndex(
                (cat) => cat.id === menu.categoryId
              );
              menuData[index].categoryName = this.categoryData[idx].name;
            });
            this.tableData = menuData;
          });
        });
    },

    handleMenuEdit(index, row) {
      console.log(index, row);
    },
    handleMenuDelete(index, row) {
      let uuid = row.id;

      axios.delete(`http://localhost:3000/menu/${uuid}`).then((response) => {
        if (response.status == "200") {
          this.setMenuTable();
        }
      });
    },
    handleMenuCopy(index, row) {
      let uuid = row.id;

      axios.get(`http://localhost:3000/menu/${uuid}`).then((response) => {
        if (response.status == "200") {
          axios
            .post("http://localhost:3000/menu", {
              categoryId: response.data.categoryId,
              name: response.data.name,
              price: response.data.price,
            })
            .then((res) => {
              if (res.status == "201") {
                this.setMenuTable();
              }
            })
            .catch((err) => {
              console.log(err.response);
            });
        }
      });
    },
  },
};
</script>

<style>
.title {
  font-style: normal;
  font-weight: 500;
  font-size: 34px;
  line-height: 44px;
  /* identical to box height, or 129% */

  letter-spacing: -0.25px;

  /* Text/OnLight1 */

  color: #231f20;

  margin-top: 50px;
}

.btn-cance {
  color: #28b7ff;
  border: none;
}

.el-dialog {
  border-radius: 8px;
}

.el-form-item__label {
  color: #000000;
  font-weight: bold;
}

.menu-title {
  color: #000000;
  font-weight: bold;
}

.icon-color {
  color: #606266;
}

.m-form {
  margin-top: 50px;
}
</style>