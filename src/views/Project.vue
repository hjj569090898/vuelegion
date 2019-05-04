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

<el-dialog title= 123 :visible.sync="dialogTableVisible">
    <div style="text-align: right;">
     
     <el-button type="primary" @click="routerto()">查看工程任务详情</el-button> </div>
    

<div id="myChart" :style="{width: '300px', height: '300px'}"></div>




</el-dialog>

    </div>
  </div>

  
</template>
<script>
let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/bar')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
import { ListProject} from "../api/api";
import { truncate } from 'fs';
import router from '../router/index'
import { homedir } from 'os';
export default {
  name:'Project',
  data() {
    return {
      tip: "请输入项目关键词",
      aproject:"",
      Project:[],
          id:"123",
          PageInfo:1,
      currentPage: 1,
      dialogTableVisible:false,
    };
  },
    created() {
    this.getList();
  },
   mounted() {
   
  },
  methods: {
      handdle(row){
        console.log(row.leader);
        this.dialogTableVisible = true;
         this.$nextTick(() => {
      //  执行echarts方法
        this.drawLine()
      })
        this.aproject = row.pjname;

      },
      getList(){
        ListProject(1).then(response => {
          this.Project = response.data.Project;
          this.PageInfo = response.data.page;
          // this.PageInfo = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
     
    },
       handleCurrentChange(val) {
      this.currentPage = val;
      this.Search.id = "";
      ListProject(this.currentPage)
        .then(response => {
          this.Project = response.data.Project;
          this.PageInfo = response.data.page;
          //请求正确时执行的代码
        })
        .catch(function(response) {
          console.log(response); //发生错误时执行的代码
        });
    },
    routerto(){
      router.go(-1);
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption({
        title: { text: 'ECharts 入门示例' },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 110, 10, 20]
        }]
      });
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


