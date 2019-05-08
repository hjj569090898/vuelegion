<template>

<div>
  
<el-header style=" font-size: 25px">
    <div>
    <div style="text-align: left;">
     项目管理
     </div>
      
     <div style="text-align: right;">
         <el-button type="success" @click="ClickInsert()">+ 项目添加</el-button>
     </div>
      
     </div>
    </el-header>
  
    <el-input
      :placeholder="tip"
      v-model="nowid"
      style="width: 280px; text-align: right;"
      class="filter-item"
      prefix-icon="el-icon-search"
        @keyup.enter.native="SeachClick"
    />
    
    <el-button type="success" @click="SeachClick">查询</el-button>
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

<el-dialog title="项目立项" :visible.sync="InsertFormVisible" :close-on-click-modal="true">
      <el-form :model="InsertForm" label-width="80px">
           
      <el-form-item label="工程名称">
          <el-input v-model="InsertForm.pjname"></el-input>
        </el-form-item>

<el-form-item label="工程状态">
<el-select  v-model="InsertForm.state" placeholder="工程状态">
    <el-option
   v-for="item in stateselect"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      >
    </el-option>
  </el-select> 
</el-form-item> 

        <el-form-item label="计划开始">
          <el-date-picker
      v-model="InsertForm.planstart"
      type="date"
      value-format="yyyy-MM-dd"
      placeholder="选择计划开工时间">
    </el-date-picker>
        </el-form-item>
        <el-form-item label="计划完工">
         <el-date-picker
      v-model="InsertForm.planend"
      
      type="date"
      value-format="yyyy-MM-dd"
      placeholder="选择计划完工时间">
    </el-date-picker>
        </el-form-item>
        <el-form-item label="负责人">
          <el-input  v-model="InsertForm.leader"></el-input>
        </el-form-item>
         <el-form-item label="合同编号">
          <el-input v-model="InsertForm.ctid"></el-input>
        </el-form-item>
        <el-form-item label="工程阶段">
         <el-select  v-model="InsertForm.pnow"  placeholder="工程阶段">
    <el-option
   v-for="item in pnowselect"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      >
    </el-option>
  </el-select>  
        </el-form-item>
        
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="InsertFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleInsert()">确 定</el-button>
      </div>
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
import { ListProject,
          AddProject,
          QueryProject
    } from "../api/api";
import { truncate } from 'fs';
import router from '../router/index'
import { homedir } from 'os';
export default {
  name:'Project',
  data() {
    return {
      tip: "请输入项目关键词",
      aproject:"",
      stateselect:[{
        value:"正常",
        label:"正常"
      },{value:"延期",label:"延期"},{value:"提前",label:"提前"},{value:"其他",label:"其他"}],
      pnowselect:[{
        value:"未开工",
        label:"未开工"
      },{value:"施工中",label:"施工中"},{value:"已完工",label:"已完工"},{value:"其他",label:"其他"}],
      Project:[],
          id:"123",
          PageInfo:1,
      currentPage: 1,
      nowid:"",
      dialogTableVisible:false,
      InsertFormVisible:false,
      InsertForm:{
        pjname:"",
        state:"",
        planstart:"",
        planend:"",
        leader:"",
        ctid:"",
        pnow:"",
        
      }
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
        this.aproject = row.id;

      },
      getList(){
        ListProject(1).then(response => {
          this.Project = response.data.progress;
          this.PageInfo = response.data.length;
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
           this.$router.push({path:'/progress',query:{projectid:this.aproject}});
    },
    ClickInsert(){
      this.InsertFormVisible = true;
      console.log("项目立项")
    },
    handleInsert()
    {
      console.log(this.InsertForm);
      AddProject(this.InsertForm).then(response=>{
        this.InsertFormVisible = false;
        console.log(InsertForm);
        console.log("添加成功");
      }).catch(function(error){
        console.log(error);
      });
    },
    SeachClick(){

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


