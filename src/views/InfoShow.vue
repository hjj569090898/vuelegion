<template>
<div>
  
  
 
 <el-tabs :tab-position="tabPosition">

    <el-tab-pane label="个人信息">

      <el-row>
        <el-col :span="4"><el-divider content-position="left">&nbsp;</el-divider></el-col>
         <el-col :span="8"><div>
           <el-divider content-position="left">用户信息</el-divider>
      <el-form :model="userinfo" label-width="70px">
        <el-form-item label="用户编号">
          <el-input v-model="userinfo.id" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="账户名">
          <el-input v-model="userinfo.username" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名">
          <el-input v-model="userinfo.name" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="身份证号">
          <el-input v-model="userinfo.credit" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="手机号" >
          <el-input v-model="userinfo.mobile" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input  v-model="userinfo.email" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="生日">
          <el-input  v-model="userinfo.birthday" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="部门编号">
          <el-input v-model="userinfo.groupid" :disabled="true"></el-input>
        </el-form-item>

        <el-button type="primary" @click="infoModify" >修改</el-button>
        <el-button type="primary" @click="backtoindex" >返回</el-button>
      
      </el-form>
      </div></el-col>
       <el-col :span="8"><div><el-divider content-position="left">头像</el-divider></div></el-col>
       <el-col :span="4"><el-divider content-position="left">&nbsp;</el-divider></el-col>
</el-row>
      
  </el-tab-pane>
    <el-tab-pane label="权限信息">权限信息
    <el-row>
      <el-col :span="3"><el-divider content-position="left">&nbsp;</el-divider></el-col>
         <el-col :span="9"><div>
           <el-divider content-position="left">用户个人权限</el-divider>
           <el-table
    :data="userpermission"
    border
    style="width: 100%">
    <el-table-column
      prop="id"
      label="权限编号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="permission"
      label="权限标志"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="权限名称"
      width="180">
    </el-table-column>
  </el-table>

           </div></el-col>
         <el-col :span="9"><div>
           <el-divider content-position="left">所在部门权限</el-divider>
           <el-table
    :data="groupmission"
    border
    style="width: 100%">
    <el-table-column
      prop="id"
      label="权限编号"
      width="180">
    </el-table-column>
     <el-table-column
      prop="permission"
      label="权限标志"
      width="180">
     </el-table-column>
    <el-table-column
      prop="name"
      label="权限名称"
      width="180">
    </el-table-column>
           </el-table>
           </div></el-col>
           <el-col :span="3"><el-divider content-position="left">&nbsp;</el-divider></el-col>
    </el-row>
    </el-tab-pane>

    <el-tab-pane label="考勤信息">角色管理</el-tab-pane>
    <el-tab-pane label="其他">定时任务补偿</el-tab-pane>
  </el-tabs>
 
</div>
</template>

<script>
import {
  getmyuser,
  getpermission
} from "../api/api";
export default {
 data() {
      return {
        tabPosition: 'top',
        userpermission:[],
        groupmission:[],
        userinfo:{},
        myuser:"",
      };
    },
    created() {
    this.getList();
    this.getpermissiontable();
  },
  methods: {
      infoModify(){
             this.$router.push({path:'/infomodify',query:{username:localStorage.getItem("User"),groupable:true}});
      },
      backtoindex(){
        this.$router.push("/infomodify");
      },
      getList(){
        this.myuser = localStorage.getItem("User");
        getmyuser(this.myuser).then(response => {
          this.userinfo = response.data.info;
        })
        .catch(function(error) {
          console.log(error);
        });
      },
      getpermissiontable(){
      getpermission(localStorage.getItem("User")).then(response => {
          this.userpermission = response.data.permission;
          this.groupmission = response.data.groupmission;
        })
        .catch(function(error) {
          console.log(error);
        });
      }
  }
    
};
</script>