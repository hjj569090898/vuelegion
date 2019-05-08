<template>

  <div>
    <el-row>
  <el-col :span="3"><div><el-divider></el-divider></div></el-col>
  <el-col :span="9">
    <el-divider></el-divider>
    <el-form :model="registerUser" :rules="rules" ref="registerForm" label-width="180px">
      <el-form-item label="账号名" prop="username">
        <el-input
          v-model="registerUser.username"
          style="width: 280px;"
          placeholder="请输入用户名"
          disabled   
        ></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="registerUser.email" style="width: 280px;" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="registerUser.mobile" style="width: 280px;" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名" prop="name">
        <el-input v-model="registerUser.name" style="width: 280px;" placeholder="请输入真实姓名"></el-input>
      </el-form-item>
      <el-form-item label="身份证号" prop="credit">
        <el-input v-model="registerUser.credit" style="width: 280px;" placeholder="请输入身份证号"></el-input>
      </el-form-item>
       <el-form-item label="生日" prop="credit">
        <el-input v-model="registerUser.birthday" style="width: 280px;" placeholder="请输入生日"></el-input>
      </el-form-item>
      <el-form-item label="部门">
        <el-select v-model="registerUser.groupid" style="width: 280px;" placeholder="请选择部门"
        :disabled="groupable"
        >
          <el-option
            v-for="item in group"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
        @click="ClickModify"
          type="primary"
          class="submit_btn"
        >确认修改 </el-button>
      </el-form-item>
    </el-form>
    </el-col>
 <el-col :span="9"><div><el-divider></el-divider></div></el-col>
<el-col :span="3"><div><el-divider></el-divider></div></el-col>
    </el-row>
    
  </div>
</template>

<script>
import { getmyuser,register,infomodify } from "../api/api";
export default {
  name: "register",
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.registerUser.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var validatePass3 = (rule, value, callback) => {
      if (this.isexits==1) {
        callback(new Error("用户已存在!"));
      } else {
        callback();
      }
    };
    return {
      myuser:"",
      groupable:true,
      registerUser: {
        id:"",
        username:"",
        birthday:"",
        credit:"",
        mobile:"",
        name: "",
        email: "",
        groupid: ""
      },
      isexits: "0",
      group: [
        { value: "1", label: "行政部" },
        { value: "2", label: "人事部" },
        { value: "3", label: "仓储部" },
        { value: "4", label: "财务部" },
        { value: "5", label: "计划部" },
        { value: "6", label: "生产部" },
        { value: "7", label: "其他" }
      ],
      rules: {
        email: [
          {
            type: "email",
            required: true,
            message: "邮箱格式不正确",
            trigger: "blur"
          }
        ],
        credit: [
          {
            required: true,
            message: "身份证格式不正确",
            trigger: "blur"
          },
          { min: 18, max: 18, message: "长度为18", trigger: "blur" }
        ],
         mobile: [
          {
            required: true,
            message: "手机号格式不正确",
            trigger: "blur"
          },{ min: 6, max: 20, message: "长度不正确", trigger: "blur" }
        ],
      }
    }
    
  },
  created() {
    this.userinfo();
  },
  methods: {
    userinfo(){
      console.log(this.groupable);
      this.myuser = this.$route.query.username;
      this.groupable= this.$route.query.groupable;
         getmyuser(this.myuser).then(response => {
          this.registerUser = response.data.info;
          console.log(this.registerUser);
        })
        .catch(function(error) {
          console.log(error);
        });
      },
      ClickModify(){
    infomodify(this.registerUser).then(response => {
      console.log(this.registerUser);
          if( response.data.code==1){
            alert("修改成功！");
            this.$router.push("/infoshow");

          }
        })
        .catch(function(error) {
          console.log(error);
        });
      }
  },
  

  
};
</script>


