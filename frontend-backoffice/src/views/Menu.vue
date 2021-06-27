<template>

<el-row type="flex" justify="space-around">
  
  <el-col :span="18">

    <el-row :gutter="20">
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <p class="title"> Menu </p>
        </div>
      </el-col>
      <el-col :span="6" :offset="12">
        <div class="grid-content bg-purple">
          <el-button type="primary"  size="medium" icon="el-icon-plus" round @click="dialogFormVisible = true">
            Add New Menu 
          </el-button>

          
        </div>
      </el-col>
    </el-row>

    <data-tables 
    class="menu-table"
    :data="tableData" 
    :total="5">
    <el-table-column  
      label="ID"
      prop="id"
      sortable="custom">
    </el-table-column>
    <el-table-column 
      label="Category"
      prop="category"
      sortable="custom">
    </el-table-column>
    <el-table-column 
      label="Name"
      prop="name"
      sortable="custom">
    </el-table-column>
    <el-table-column 
      label="Price"
      prop="price"
      sortable="custom">
    </el-table-column>
    <el-table-column fixed="right">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="editUsexr(scope.row)">Edit</el-button>
            <el-button type="text" size="small">Copy</el-button>
            <el-button type="text" size="small">Delete</el-button>
          </template>
    </el-table-column>
  </data-tables>
  </el-col>

  <el-dialog title="Add Menu" :visible.sync="dialogFormVisible" class="menu-title">
  <el-form :model="form">
    <el-form-item label="Name" :label-width="formLabelWidth" >
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="Category" :label-width="formLabelWidth">
      <el-select v-model="form.category" placeholder="Please select a Category" style="width: 100%" >
        <el-option
          v-for="item in form.categoryDataset"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Price" :label-width="formLabelWidth">
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
    
  </el-form>
  <span slot="footer" class="dialog-footer">
    <el-button class="btn-cance" @click="dialogFormVisible = false">Cancel</el-button>
    <el-button type="primary" @click="dialogFormVisible = false" icon="el-icon-plus" round>Add Menu</el-button>

  </span>
</el-dialog>
</el-row>



</template>

<script>
export default {
  name: "menu",
  data() {
    return {
       dialogFormVisible: false,
        form: {
         
          categoryDataset: [
            {
              value: 'A',
              label: 'A'
            },
            {
              value: 'B',
              label: 'B'
            },
            {
              value: 'C',
              label: 'C'
            },
          ],
          category: '',
          name: '',
          price: '',
        },
        formLabelWidth: '120px',
      tableHeader: 
        {
          t_id: "id",
          t_category: "category",
          t_name: "name",
          t_price : "price"
        },
      tableData: [
        {
          id: "001",
          category: "Cate A",
          name: "Tom",
          price: 25,
        },
        {
          id: "002",
          category: "Cate B",
          name: "Tom",
          price: 45,
        },
        {
          id: "003",
          category: "Cate A",
          name: "Tom",
          price: 25,
        }
      ],
    };
  },
  methods: {
      
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

    color: #231F20;

  }

  .btn-cance{
    color: #28B7FF;
    border: none;
  }
   
   .el-dialog {
     border-radius: 8px;
   }

    .el-form-item__label {
      color: #000000;
      font-weight: bold;
    }

    .menu-title{
      color: #000000;
      font-weight: bold;
    }
</style>