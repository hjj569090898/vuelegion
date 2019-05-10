<template>
<div>
    <span>您共有{{listcount}}申请记录</span>
    <el-button type="success" round @click="ClickInsert">添加申请</el-button>
      <el-table :data="applydate" border style="width: 100%">
      <el-table-column prop="id" label="申请编号" width="140"></el-table-column>
      <el-table-column prop="money" label="金额" width="140"></el-table-column>
      <el-table-column prop="date" label="申请日" width="110"></el-table-column>
      <el-table-column prop="reason" label="原因" width="180"></el-table-column>
      <el-table-column prop="state" label="状态" width="110"></el-table-column>
      <el-table-column prop="audidate" label="audidate" width="110"></el-table-column>
      </el-table>

 <el-dialog title="项目立项" :visible.sync="InsertFormVisible" :close-on-click-modal="true">
        <el-form :model="InsertForm" label-width="80px">

          <el-form-item label="金额">
            <el-input v-model="InsertForm.money"></el-input>
          </el-form-item>

           <el-form-item label="申请描述(原因)">
            <el-input v-model="InsertForm.reason"></el-input>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="InsertFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleInsert">确 定</el-button>
        </div>
      </el-dialog>

    </div>
</template>
<script>
import {
  Userapplylist,
  getmyuser,
  adduserapply
} from "../api/api";
export default {
    data(){
        return {
            applydate:[],
            listcount:0,
            InsertFormVisible:false,
            InsertForm:{
                    userid:"",
                    money:"",
                    reason:"",
                    state:"审核中",
                    date:"",
                    audidate:""
            },
            userinfo:{
                
            },
            

        }
    },
    created() {
    this.getList();
  },
    methods: {
        getList(){
            Userapplylist(localStorage.getItem("User"))
            .then(response => {
          this.applydate = response.data.userapply;
          this.listcount = response.data.length;
        })
        .catch(function(error) {
          console.log(error);
        });
        getmyuser(localStorage.getItem("User")).then(response => {
           this.userinfo = response.data.info;
          console.log(this.userinfo.id);
        })
        .catch(function(error) {
          console.log(error);
        });
        },
        ClickInsert(){
            this.InsertFormVisible =true;
        },
        handleInsert(){
            this.InsertForm.userid = this.userinfo.id;
            this.InsertForm.date = localStorage.getItem("User");
            
             adduserapply(this.InsertForm).then(response => {
           
          if(response.data ==1)
          {
              alert("添加成功");
              this.InsertFormVisible =false;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
        }
    }
}
</script>
