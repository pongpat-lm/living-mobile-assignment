<template>
    <el-col :span="3" >
        <el-button type="text" size="small" 
            class="icon-color"
            @click="editdialog = true" 
            icon="el-icon-edit">
          <!-- Edit  -->
        </el-button>

          <el-dialog title="Edit Menu" :visible.sync="editdialog" class="menu-title" :append-to-body="true">
                <el-form :model="form">
                     
                    <el-form-item :label="label.name" :label-width="formLabelWidth" >
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item :label="label.categoryId" :label-width="formLabelWidth">
                    <el-select v-model="form.categoryId" placeholder="Please select a Category" style="width: 100%" >
                        <el-option
                        v-for="item in form.categoryDataset"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    </el-form-item>
                    <el-form-item :label="label.price" :label-width="formLabelWidth">
                    <el-input  type="number" v-model="form.price" autocomplete="off"></el-input>
                    </el-form-item>
                    
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button class="btn-cance" @click="editdialog = false">Cancel</el-button>
                    <el-button type="primary" icon="el-icon-plus" @click="editMenu()" round>Edit Menu</el-button>
                </span>
            </el-dialog>

    </el-col>
</template>

<script>
import axios from "axios";

export default {
    name: 'menuEditForm',
    props:{
        form : {
            type : Object,
            // default : function(){
            //     return `Just Bom ...`
            // }
            // validator: function(){
            //     return false;
            // }
            
        }
    },
    data() {
        return {
            label:{
                name:"Name",
                categoryId:"Category",
                price:"Price"
            },
            editdialog: false,
            formLabelWidth: '120px',
            
       }
    },
    mounted(){
        this.setCategotyDropdown();
    },
    methods: {
        setCategotyDropdown(){
        this.form.categoryDataset = [
                {
                value: '1',
                label: 'Categoty 1'
                },
                {
                value: '2',
                label: 'Categoty 2'
                },
                {
                value: '3',
                label: 'Categoty 3'
                },
            ];

     },
    editMenu() {
      let formData = this.form;
      let uuid = this.form.id

      if(this.checkForm(formData) == true){
        axios.put(`http://localhost:3000/menu/${uuid}`, {
          categoryId: formData.categoryId,
          name: formData.name,
          price: formData.price
          }).then(res => {
            if(res.status == '200'){
                this.$root.$refs.index.setMenuTable();
                this.editdialog = false;
            }
          }).catch(err => {
            console.log(err.response);
          });
      }
 
   
    },
    resetForm(){
      this.form.categoryDataset = [];
      this.form.categoryId = '';
      this.form.name = '';
      this.form.price = '';
    },

    checkForm(data) {
        if (!data.name) {
            this.label.name = `Name *`
        }  

        if (!data.categoryId) {
            this.label.categoryId = `Category *`
        } 
        
        if (!data.price) {
            this.label.price = `Price *`
        }  

        if ((!data.name) || (!data.categoryId) || (!data.price)){
            return false
        } else {
            return true
        }
        
    }
   }
}
</script>
  