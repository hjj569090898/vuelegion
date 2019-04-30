<template>
  <el-row class="menu_page">
    <el-col>
      <el-menu
        mode="vertical"
        background-color="#324057"
        text-color="#fff"
        active-text-color="#409eff"
        class="el-menu-vertical-demo"
      >
        <router-link to="/home">
          <el-menu-item index="0">
            <i class="iconfont el-le-iconxiangmuguanli"></i>
            <span slot="title">首页</span>
          </el-menu-item>
        </router-link>
        <template v-for="item in items">
          <el-submenu v-if="item.children" :index="item.path" :key="item.path">
            <template slot="title">
              <i :class="'iconfont '+item.icon"></i>
              <span slot="title">{{item.name}}</span>
            </template>
            <router-link v-for="(citem,cindex) in item.children" :to="citem.path" :key="cindex">
              <el-menu-item :index="citem.path">
                    <!-- {{citem.name}} -->
                  &emsp;{{citem.name}}
                  
              </el-menu-item>
              
            </router-link>
          </el-submenu>
        </template>
      </el-menu>
    </el-col>
  </el-row>
</template>
<script>
import '../assets/icon/iconfont.css'
export default {
  name: "leftmenu",
  data() {
    return {
      items: [
        {
          icon: "el-le-iconrongzixiangmu00",
          name: "资金管理",
          path: "fund",
          badge:"",
          children: [{ path: "Finance", name: "  资金流水" },
          {path:"auditing", name:"  资金申用审核"},
          {path:"payroll", name:"  工资发放"},
          
          ]
        },
        {
          icon: "el-le-iconxiangmushenhe",
          name: "项目管理",
          path: "fund1",
          children: [{ path: "Project", name: "  工程管理" },
          { path: "infoshow4", name: "  计划管理" }]
        },
        {
          icon: "el-le-iconcangchu",
          name: "仓储管理",
          path: "goodslist",
          children: [{ path: "goodslist", name: "库存信息" },
          { path: "goodslist5", name: "  出库信息" },
          { path: "stockin", name: "  入库信息" },
          ]

        },
        {
          icon: "el-le-iconHRrenshirenshiguanli",
          name: "个人中心",
          path: "info",
          children: [{ path: "infoshow", name: "  个人信息" },
          { path: "infoModify", name: "  信息修改" },
          { path: "infoshow6", name: "  考勤及薪资" }]
        },
         
         {
          icon: "el-le-iconrenshiguanli",
          name: "人事管理",
          path: "register",
          children: [{ path: "register", name: "  人事变动" },
          { path: "register", name: "  人员入职" },
          { path: "infoshow8", name: "  考勤管理" }
        
          
          ]
        },
      ]
    };
  },
  mounted(){

  }
};
</script>
<style scoped>
.menu_page {
  position: fixed;
  top: 95px;
  left: 0;
  min-height: 100%;
  background-color: #334057;
  z-index: 99;
}
.el-menu {
  border: none;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 210px;
  min-height: 400px;
}
.el-menu-vertical-demo {
  width: 35px;
}
.el-submenu .el-menu-item {
  min-width: 180px;
}

.hiddenDropdown,
.hiddenDropname {
  display: none;
}
a {
  text-decoration: none;
}
</style>
