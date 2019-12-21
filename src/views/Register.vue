<template>
  <div>
    <el-row>
      <el-col :span="5">
        <div>
          <el-divider>&nbsp;</el-divider>
        </div>
      </el-col>
      <el-col :span="10">
        <el-container>
          <el-main>
            <div v-if="active===0">
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
                  <el-input
                    v-model="registerUser.mobile"
                    style="width: 280px;"
                    placeholder="请输入手机号"
                  ></el-input>
                </el-form-item>
                <el-form-item label="真实姓名" prop="mobile">
                  <el-input v-model="registerUser.name" style="width: 280px;" placeholder="请输入真实姓名"></el-input>
                </el-form-item>
                <el-form-item label="身份证号" prop="mobile">
                  <el-input
                    v-model="registerUser.credit"
                    style="width: 280px;"
                    placeholder="请输入身份证号"
                  ></el-input>
                </el-form-item>
                <el-form-item label="生日" prop="birthday">
              <div class="block">
                <el-date-picker v-model="registerUser.birthday" type="date" placeholder="选择生日"></el-date-picker>
              </div>
            </el-form-item>
                <el-form-item label="选择部门">
                  <el-select
                    v-model="registerUser.groupid"
                    style="width: 280px;"
                    placeholder="请选择部门"
                  >
                    <el-option
                      v-for="item in group"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </div>

            <div v-if="active===2">
              <el-divider>请上传头像(jpg)</el-divider>
              <el-upload
                class="avatar-uploader"
                :action="avatarurl"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="avatarurl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>

            <div v-if="active===1">
              <el-divider>选择用户额外权限</el-divider>
              <el-checkbox-group v-model="permissions" size="small"></el-checkbox-group>
              <!-- <el-checkbox-button v-for="per in pers" :label="per.label" :key="per.id" :disabled="user == 'hjj'">{{per.label}}</el-checkbox-button> -->
              <el-cascader-multi
                v-model="checkList"
                :value="hadpermission"
                @change="handlemultichange"
                :data="data"
              ></el-cascader-multi>
              <!-- <el-form label-width="80px" ref="form" :model="form"  label-position="left">
        <el-form-item label="ISP: " prop="isp">
            <ele-multi-cascader
              :options="option"
              v-model="form.isp"
              placeholder="选择运营商"
              @change="ispChange"
              >
            </ele-multi-cascader>
        </el-form-item>
        <!-- <el-form-item>
            <el-button type="primary" @click="submit">测试提交</el-button>
              </el-form-item>-->
              <!-- </el-form> -->
            </div>
          </el-main>

          <el-footer>
            <el-steps :active="active" finish-status="success">
              <el-step title="基本信息"></el-step>
              <el-step title="权限信息"></el-step>
              <el-step title="个人头像"></el-step>
            </el-steps>
          </el-footer>
        </el-container>

        <div v-if="active!=3">
          <el-button style="margin-top: 12px;" @click="next">下一步</el-button>
          <div v-if="active!=0">
            <el-button @click="pre">上一步</el-button>
          </div>
        </div>
      </el-col>

      <el-col :span="9">
        <div>
          <el-divider>&nbsp;</el-divider>
        </div>
      </el-col>
    </el-row>

    <div v-if="active===3">
      <el-row>
        <el-col :span="8">
          <el-divider>基本信息</el-divider>
          <el-form :model="registerUser" :rules="rules" ref="registerForm" label-width="180px">
            <el-form-item label="用户名" prop="username">
              <el-input
                v-model="registerUser.username"
                disabled
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
            <el-form-item label="生日" prop="birthday">
              <div class="block">
                <el-date-picker v-model="registerUser.birthday" type="date" placeholder="选择生日"></el-date-picker>
              </div>
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
          </el-form>
        </el-col>
        <el-col :span="8">
          <el-divider>权限信息</el-divider>
          <el-checkbox-group v-model="permissions" size="small">
            <!-- <el-checkbox-button v-for="per in pers" :label="per.label" :key="per.id" >{{per.label}}</el-checkbox-button>
            -->
            <el-cascader-multi v-model="checkList" @change="handlemultichange" :data="data"></el-cascader-multi>
          </el-checkbox-group>
          <el-button style="margin-top: 12px;" @click="submitForm">确认完毕，注册</el-button>
        </el-col>
        <el-col :span="8">
          <el-divider>个人头像</el-divider>
          <el-upload
            class="avatar-uploader"
            :action="avatarurl"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="avatarurl" :src="avatarurl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { username, register, addpermission } from "../api/api";
// import {, deleteRequest} from './static/js/axiosarray';
import axios from "axios";
import qs from "qs";
import { request } from "https";
import { Message, Loading } from 'element-ui';
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
      if (this.isexits == 1) {
        callback(new Error("用户已存在!"));
      } else {
        callback();
      }
    };
    return {
      zifuchuan: "",
      checkList: [],
      formlist: [],
      testlist: ["a1", "b2", "c1"],
      form: {
        isp: []
      },
      hadpermission: ["goods", "project", "progress"],
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
      registerusername: "",
      imageUrl: "",
      tabPosition: "top",
      active: 0,
      registerUser: {
        username: "",
        credit: "",
        mobile: "",
        birthday: "",
        name: "",
        email: "",
        password: "",
        password2: "",
        groupid: ""
      },
      isexits: 0,
      avatarurl: "",
      username: "",
      permissions: [],
      group: [
        { value: "1", label: "行政部" },
        { value: "2", label: "人事部" },
        { value: "3", label: "仓储部" },
        { value: "4", label: "财务部" },
        { value: "5", label: "工程部" },
        { value: "6", label: "其他" }
      ],
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "change" },
          {
            min: 2,
            max: 30,
            message: "长度在 2 到 30 个字符",
            trigger: "blur"
          }
          // { validator: validatePass3, trigger: "blur" }
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
  created() {
    this.getList();
  },
  methods: {
    next() {
      if (this.active++ > 2) this.active = 0;
    },
    pre() {
      this.active--;
    },
    getList() {
      this.avatarurl =
        "http://localhost:8080/avatar/" + this.registerUser.username;
    },
    permission() {
      request({
        url:
          "http://localhost:8080/addpermission/" + this.registerUser.username,
        method: "post",
        data: qs.stringify({ permission: this.testlist })
      })
        .then(response => {
          console.log(response.data);
        })
        .catch(function(error) {
          alert(error);
        });
    },
    submitForm() {
      this.theregister();
      // setTimeout(function() {
      // callback(null);
      //   }, 750);
      // this.theaddpermission();
      // register(this.registerUser)
      //   .then(res => {
      //     // 注册成功
      //     if (res.data.code == 1) {
      //       // this.permission();
      //       // this.registerusername = res.data.username;
      //       // qs.stringify({ testlist }, { indices: false });
      //       addpermission(this.registerUser.username, this.testlist).then(response => {
      //         if(response.data.code ==1)
      //         {
      //           alert("注册成功！")
      //         }
      //       }).catch(function(error) {
      //           console.log(error);
      //   });
      //     }
      //     // this.$router.push("/infoShow");
      //   })
      //   .catch(function(error) {
      //     console.log(error);
      //   });
    },
    theregister() {
      register(this.registerUser)
        .then(res => {
          if (res.data.code == 1) {
            this.registerUser.username = res.data.username;
            this.theaddpermission();
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    theaddpermission() {
      this.zifuchuan = this.checkList.join(",");
      addpermission(this.registerUser.username, this.zifuchuan)
        .then(response => {
          if (response.data.code == 1) {
            alert("注册成功！");
             this.$router.push("/employee")
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    handleAvatarSuccess(res, file) {
      this.avatarurl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    handlemultichange() {
      // for(i=0;i<this.checkList.length;i++)
      // {
      //   this.formlist[i]=this.checkList[i][2];
      // }
      console.log(this.checkList);
    },
    validateisexits() {
      this.avatarurl =
        "http://localhost:8080/avatar/" + this.registerUser.username;
      username(this.registerUser.username)
        .then(response => {
          if (response.data.isexits == 0) {
            this.isexits = 0; //不存在则为0 ，为0可以注册
          } else if (response.data.isexits == 1) {
            this.isexits = 1; //存在为1,不能注册
            Message.error("用户已存在!");
          }
          console.log(response.data.isexits);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    ispChange(values, items) {
      this.outputs.values = values;
      this.outputs.items = items;
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
  border-color: #409eff;
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
  width: 278px;
  height: 278px;
  display: block;
}
.showable {
  display: none;
}
body {
  text-align: center;
}
#main {
  margin: 0 auto;
}
</style>