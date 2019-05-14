<template>
    <div>
         <el-input
      :placeholder="tip"
      v-model="searchid"
      style="width: 280px;"
      class="filter-item"
      prefix-icon="el-icon-search"
      @keyup.enter.native="seachClick"
    />

    <el-select v-model="searchgroup" placeholder="选择部门" style="width: 200px" @change="getList">
      <el-option v-for="item in Groups" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <el-button type="success" @click="getList">查询</el-button>
      <div>
         <el-button type="primary" @click="ClickInsert()">+人员入职</el-button>
     </div>

 <el-table :data="listuser" border style="width: 100%">
      <el-table-column prop="id" label="编号" width="140"></el-table-column>
      <el-table-column prop="username" label="工号" width="140"></el-table-column>
      <el-table-column prop="name" label="真实姓名" width="150"></el-table-column>
      <el-table-column prop="credit" label="身份证号" width="110"></el-table-column>
      <el-table-column prop="mobile" label="手机号" width="110"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="110"></el-table-column>
      <el-table-column prop="groupid" label="部门号" width="110"></el-table-column>
      <el-table-column label="操作" width="220">
        <template slot-scope="scope">
          <el-button @click="ClickList(scope.row)" type="text" size="medium" icon="el-icon-view">查看</el-button>
          <el-button
            @click="routerto(scope.row)"
            type="text"
            size="medium"
            icon="el-icon-edit-outline"
          >编辑</el-button>
          <el-button
            @click="ClickDelete(scope.row.id)"
            type="text"
            size="medium"
            icon="el-icon-delete"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

     <div class="block">
      <span class="demonstration"></span>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        layout="total, prev, pager, next"
        :total="PageInfo"
      >
        <!-- data="tableData.slice((currentPage-1)pagesize,currentPagepagesize)"； -->
      </el-pagination>

    </div>
    </div>
</template>
<script>
import { getAllUser,
DeleteUser,
UserBygroupid, } from "../api/api";
import router from '../router/index';
export default {
    data(){
        return{
            tip:"姓名/员工编号",
            // search:{id:"",group:""},
            searchgroup:"",
            searchid:"",
            Groups: [
              {value:"",label:"全部"},
        { value: "1", label: "行政部" },
        { value: "2", label: "人事部" },
        { value: "3", label: "仓储部" },
        { value: "4", label: "财务部" },
        { value: "5", label: "计划部" },
        { value: "6", label: "生产部" },
        { value: "7", label: "其他" }
      ],
    PageInfo: 1,
        currentPage: 1,
        listuser:[],

        }
    },
     created() {
    this.getList();
  },
    methods: {
     getList(){
       if(this.searchgroup=="")
       {
         
          getAllUser(this.currentPage)
        .then(response => {
          this.listuser = response.data.user;
          // this.PageInfo = response.data;
          this.PageInfo = response.data.length;
        })
        .catch(function(error) {
          console.log(error);
        });
     }
     else{

          UserBygroupid(this.searchgroup,this.currentPage) .then(response => {
          this.listuser = response.data.user;
          // this.PageInfo = response.data;
          this.PageInfo = response.data.length;
        })
        .catch(function(error) {
          console.log(error);
        });

     }
     },
     handleCurrentChange(value){
       this.currentPage = value;
        this.getList();
     },
     listbygroup(){},

     ClickInsert(){
          this.$router.push("/register")
     },

    routerto(row){
      console.log(row.username);
           this.$router.push({path:'/infomodify',query:{username:row.username,groupable:false}});
    },
       ClickDelete(id) {
      this.$confirm("是否删除该账户信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          DeleteUser(id)
            .then(response => {
              this.getList();
              this.$message({
            type: "success",
            message: "删除成功!"
          });
        
            })
            .catch(function(error) {
              console.log(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
        
    },
    ClickQuery(){
     
    },
    }
}
</script>
