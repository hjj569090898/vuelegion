<template>
  <div>
    <table>
      <tr>
        <td>
    <el-divider>请填写注册信息</el-divider>
    <el-form :model="registerUser" :rules="rules" ref="registerForm" label-width="180px">
      <el-form-item label="用户名" prop="username">
        <el-input
          v-model="registerUser.username"
          @blur="validateisexits(registerUser.name)"
          style="width: 280px;"
          placeholder="请输入用户名"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="registerUser.password"
          style="width: 280px;"
          placeholder="请输入密码"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="password2">
        <el-input
          v-model="registerUser.password2"
          style="width: 280px;"
          placeholder="请确认密码"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="registerUser.email" style="width: 280px;" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="registerUser.mobile" style="width: 280px;" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item label="真实姓名" prop="mobile">
        <el-input v-model="registerUser.name" style="width: 280px;" placeholder="请输入真实姓名"></el-input>
      </el-form-item>
      <el-form-item label="身份证号" prop="mobile">
        <el-input v-model="registerUser.credit" style="width: 280px;" placeholder="请输入身份证号"></el-input>
      </el-form-item>
      <el-form-item label="选择部门">
        <el-select v-model="registerUser.groupid" style="width: 280px;" placeholder="请选择部门">
          <el-option
            v-for="item in group"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="额外权限">
    
        
    <el-checkbox-group v-model="permissions" size="small">
      <el-checkbox-button v-for="per in pers" :label="per.label" :key="per.id" :disabled="user == 'hjj'">{{per.label}}</el-checkbox-button>
    </el-checkbox-group>
  
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          class="submit_btn"
          :disabled="isexits != 0"
          @click="submitForm"
        >注 册</el-button>
      </el-form-item>
    </el-form>
    <td>
      <td> <div>
         <el-divider></el-divider>
      <el-upload
  class="avatar-uploader"
  action="https://jsonplaceholder.typicode.com/posts/"
  :show-file-list="false"
  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
    </div></td>
    </tr>
    </table>
  </div>

</template>

<script>
import { username,register } from "../api/api";
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
      pers : [
        {id:"stockin",label:'出库'},
        {id:"stockout",label:'入库'},
        {id:3,label:'广州'}, 
        {id:4,label:'深圳'}
        ],
       imageUrl: '',
      registerUser: {
        username: "",
        credit:"",
        mobile:"",
        name: "",
        email: "",
        password: "",
        password2: "",
        groupid: ""
      },
      isexits: "0",
      username: "",
      permissions:[],
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
        name: [
          { required: true, message: "用户名不能为空", trigger: "change" },
          { min: 2, max: 30, message: "长度在 2 到 30 个字符", trigger: "blur" },
          { validator: validatePass3, trigger: "blur" }
        ],
        email: [
          {
            type: "email",
            required: true,
            message: "邮箱格式不正确",
            trigger: "blur"
          }
        ],
        mobile: [
          {
            required: true,
            message: "手机号格式不正确",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 30, message: "长度在 6 到 30 个字符", trigger: "blur" }
        ],
        password2: [
          { required: true, message: "确认密码不能为空", trigger: "blur" },
          {
            min: 6,
            max: 30,
            message: "长度在 6 到 30 个字符",
            trigger: "blur"
          },
          { validator: validatePass2, trigger: "blur" }
        ]
      }
    };
  },
   computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {
    submitForm() {
          register(this.registerUser.registerUser)
            .then(res => {
              // 注册成功
              this.$message({
                message: res.data,
                type: "success"
              });
              this.$router.push("/infoShow");
            }).catch(function(error)
            {
               this.$message({
                message: error,
                type: "error"
              });
            });
         
    },
    handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/png';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
    validateisexits() {
      username(this.registerUser.username)
        .then(response => {
          if(response.data.isexits==0){ 
            this.isexits = 0;//不存在则为0 ，为0可以注册
          }     
          else if((response.data.isexits==1)){
            this.isexits = 1; //存在为1,不能注册
          }
          console.log(response.data.isexits); 
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

