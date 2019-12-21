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
 <el-col :span="9"><div>
   <el-divider>修改头像</el-divider>
   <el-upload
  class="avatar-uploader"
  :action="avatarurl"
  :show-file-list="false"

  :on-success="handleAvatarSuccess"
  :before-upload="beforeAvatarUpload">
  <img v-if="imageUrl" :src="imageUrl" class="avatar">
  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
</el-upload>
   </div>

   <div v-if ="permissionable">

            <div>
              <span>&nbsp;</span>
               <span>&nbsp;</span>
                <span>&nbsp;</span>
                 <span>&nbsp;</span>
                  <span>&nbsp;</span>
         <el-divider content-position="left">用户个人权限</el-divider>
           <el-table
    :data="userpermission"
    border
    style="width: 100%">
    <el-table-column
      prop="id"
      label="权限编号"
      width="100">
    </el-table-column>
    <el-table-column
      prop="permission"
      label="权限标志"
      width="150">
    </el-table-column>
    <el-table-column
      prop="name"
      label="权限名称"
      width="170">
    </el-table-column>
  </el-table>
           </div>
           <span>&nbsp;</span>
                <span>&nbsp;</span>
                 <span>&nbsp;</span>
                 <span>&nbsp;</span>
                <span>&nbsp;</span>
                 <span>&nbsp;</span>
      <el-divider content-position="left">修改用户个人权限</el-divider>
       <el-cascader-multi v-model="checkList"  :data="data"></el-cascader-multi>

         <el-button
        @click="ClickModifyPermission"
          type="primary"
          class="submit_btn"
        >确定修改权限 </el-button>
   </div>
   </el-col>
<el-col :span="3"><div><el-divider></el-divider></div></el-col>
    </el-row>
    
  </div>
</template>

<script>
import { getmyuser,register,infomodify,addpermission,getpermission } from "../api/api";
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
      zifuchuan:"",
      checkList:[],
      userpermission:[],
      myuser:"",
      avatarurl:"",
      groupable:true,
      permissionable:false,
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
        { value: "5", label: "工程部" },
        { value: "6", label: "其他" }
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
      },
       data: [
        {
          value: "",
          label: "财务",
          children: [
            {
              value: "auditing",
              label: "财务审核"
            },
            {
              value: "finance",
              label: "财务流水查看"
            }
          ]
        },
        {
          value: "",
          label: "仓储",
          children: [
            {
              value: "goods",
              label: "仓储库存"
            },
            {
              value: "stockin",
              label: "入库申请"
            },
            {
              value: "goodsapply",
              label: "出库审核"
            },
            {
              value: "goodsflow",
              label: "库存流水查看"
            }
          ]
        },
        {
          value: "",
          label: "工程",
          children: [
            {
              value: "project",
              label: "工程管理"
            },
            {
              value: "progress",
              label: "任务添加"
            }
          ]
        },
        {
          value: "",
          label: "人事",
          children: [
            {
              value: "getuser",
              label: "人员查看"
            },
            {
              value: "register",
              label: "注册功能"
            },
            {
              value: "deleteuser",
              label: "账户删除"
            },
            {
              value: "addpermission",
              label: "用户权限修改"
            }
          ]
        }
      ],
    }
    
  },
  created() {
    this.userinfo();
    this.groupable= this.$route.query.groupable;
    this.getpermissiontable();
  },
  methods: {
    userinfo(){
      console.log(this.groupable);
      
      this.myuser = this.$route.query.username;
      this.permissionable =  this.$route.query.permissionable;
      console.log(this.myuser);
      this.groupable= this.$route.query.groupable;
         getmyuser(this.myuser).then(response => {
          this.registerUser = response.data.info;
          console.log(this.registerUser);
        })
        .catch(function(error) {
          console.log(error);
        });
        if(this.myuser==""){
          this.avatarurl = "http://localhost:8080/avatar/"+localStorage.getItem("User");
           this.imageUrl =  require('../assets/avatar/'+localStorage.getItem("User")+'.jpg')//"../assets/"+this.myuser+".jpg";
        }
        else{
           this.avatarurl = "http://localhost:8080/avatar/"+this.myuser;
          this.imageUrl =  require('../assets/avatar/'+this.myuser+'.jpg')//"../assets/"+this.myuser+".jpg";
        }
      
      },
       beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      ClickModify(){
    infomodify(this.registerUser).then(response => {
      console.log(this.registerUser);
          if( response.data.code==1){
            alert("修改成功！");
            // this.$router.push("/infoshow");
             this.$router.go(0);

          }
        })
        .catch(function(error) {
          console.log(error);
        });
      },
       getpermissiontable(){
         if(this.$route.query.username=="")
         {this.userpermission=""}
         else{
       
      getpermission( this.$route.query.username).then(response => {
          this.userpermission = response.data.permission;
        })
        .catch(function(error) {
          console.log(error);
        });
      }
       },
      ClickModifyPermission(){
          
      this.zifuchuan = this.checkList.join(",");
      addpermission(this.$route.query.username, this.zifuchuan)
        .then(response => {
          if (response.data.code == 1) {
            alert("权限修改成功！");
            //  this.$router.push("/employee")
            this.$router.go(0);
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    
      }
  },
  

  
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


