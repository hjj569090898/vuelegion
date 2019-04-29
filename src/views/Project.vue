<template>
<div>
<el-header style=" font-size: 25px">
    <div>
    <div style="text-align: left;">
     项目管理
     </div>
     <div style="text-align: right;">
         <el-button type="success">+ 项目添加</el-button>
     </div>
     </div>
    </el-header>
  
    <el-input
      :placeholder="tip"
      style="width: 280px; text-align: right;"
      class="filter-item"
      prefix-icon="el-icon-search"
    />
    <!-- @keyup.enter.native="SeachClick(Search.id)"  -->

    <el-table :data="Project"  
    @row-click="handdle"
    border style="width: 100%">
<el-table-column prop="id" label="入库编号" width="140"></el-table-column>
    </el-table>
  </div>

  
</template>
<script>
import {} from "../api/api";
export default {
  data() {
    return {
      tip: "请输入项目关键词",
      Project:{
          id:"123",
    },
    };
  },
  methods: {
      handdle(){

      }
  }
};
</script> 
<style>
 .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
</style>


