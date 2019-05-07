<template>
<div>
    <el-divider content-position="left">{{projectid}}</el-divider>

      <el-collapse v-model="activeNames" @change="handleChange">
  <el-collapse-item title= "工程内容(点击查看)" name="1">
    <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
    <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
  </el-collapse-item>
  <el-collapse-item title= "工程统计(点击查看)" name="2">
      <el-input
      :placeholder="tip"
      style="width: 280px; text-align: right;"
      class="filter-item"
      prefix-icon="el-icon-search"
    />
    
     <el-table :data="Project"  
    @row-click="handdle"
    border style="width: 100%">
<el-table-column prop="id" label="项目编号" width="140"></el-table-column>
<el-table-column prop="pjname" label="工程名" width="160"></el-table-column>
<el-table-column prop="planstart" label="计划开始时间" width="130"></el-table-column>
<el-table-column prop="planend" label="计划结束时间" width="130"></el-table-column>
<el-table-column prop="actualstart" label="实际开始时间" width="130"></el-table-column>
<el-table-column prop="actualend" label="实际结束时间" width="130"></el-table-column>
<el-table-column prop="leader" label="负责人" width="110"></el-table-column>
<el-table-column prop="state" label="状态" width="110"></el-table-column>
<el-table-column prop="pnow" label="阶段" width="110"></el-table-column>
 <el-table-column label="操作" width="220">
        <template slot-scope="scope">
          <el-button @click="ClickList(scope.row)" type="text" size="medium" icon="el-icon-view">查看</el-button>
          <el-button
            @click="ClickUpdate(scope.row)"
            type="text"
            size="medium"
            icon="el-icon-edit-outline"
          >编辑</el-button>
          <!-- <el-button
            @click="ClickDelete(scope.row.in_id)"
            type="text"
            size="medium"
            icon="el-icon-delete"
          >删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <span class="demonstration"></span>
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        layout="total, prev, pager, next"
        :total="PageInfo"
      >
        <!-- data="tableData.slice((currentPage-1)pagesize,currentPagepagesize)"； -->
      </el-pagination>
    </div>
  </el-collapse-item>
</el-collapse>

</div>
</template>
<script>
import { 
          QueryProject
    } from "../api/api";
export default {
    data(){
        return {
            projectid:"",
            Project:[],
             activeNames: ['1'],
             tip:"请输入项目名/编号",
             currentPage:1,
             PageInfo:1,
        }
    },
    created() {
    this.getList();
  },
  methods: {
      getList(){
          this.projectid =this.$route.query.projectid;
          QueryProject(this.projectid).then(response => {
          this.Project = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
      },
       handleChange(val) {
        console.log(val);
      },
      handleCurrentChange(){

      },
      handdle(){

      }
  }
}
</script>
