<template>
  <div>
    <el-header style=" font-size: 25px">
      <div>
        <div style="text-align: left;">项目管理</div>

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

    <el-table :data="Project" @row-click="handdle" border style="width: 100%">
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
          >删除</el-button>-->
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

      <el-dialog title="工程总览" :visible.sync="dialogTableVisible">
        <div style="text-align: right;">
          <el-divider>{{nowprojectname}}</el-divider>
          <el-button type="primary" @click="routerto()">查看工程任务详情</el-button>
        </div>
        <el-divider content-position="left">当前进度</el-divider>
        <el-progress :text-inside="true" :stroke-width="18" :percentage="nowpercent">当前进度</el-progress>
        <el-divider content-position="left"></el-divider>
        <div>项目共有任务数量 :{{progressnum}}</div>
        <div>计划花费 ：{{plancost}} 当前花费 ：{{accoust}}</div>
        <div>额外费用{{subcost}}</div>
        <div>计划人工用时 ：{{planwork}} 当前人工用时 ：{{acwork}}</div>
        <div>计划维修时长 ：{{planday}} 当前已用时长 ：{{acday}}</div>
        <div>开工延迟时间:{{delaystart}} 完工延迟时间：{{delayend}}</div>
        <div id="myChartline" :style="{width: '500px', height: '500px'}"></div>
      </el-dialog>

      <el-dialog title="项目编辑" :visible.sync="UpdateFormVisible" :close-on-click-modal="true">
        <el-form :model="UpdateForm" label-width="80px">
          <el-form-item label="工程名称">
            <el-input v-model="UpdateForm.pjname"></el-input>
          </el-form-item>
          <el-form-item label="工程状态">
            <el-select v-model="UpdateForm.state" placeholder="工程状态">
              <el-option
                v-for="item in stateselect"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="计划开始">
            <el-date-picker
              v-model="UpdateForm.planstart"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择计划开工时间"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="计划完工">
            <el-date-picker
              v-model="UpdateForm.planend"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择计划完工时间"
            ></el-date-picker>
          </el-form-item>

          <el-form-item label="实际开始">
            <el-date-picker
              v-model="UpdateForm.actualstart"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="实际开工时间(可不填)"
            ></el-date-picker>
          </el-form-item>

          <el-form-item label="实际完工">
            <el-date-picker
              v-model="UpdateForm.actualend"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="实际完工时间(可不填)"
            ></el-date-picker>
          </el-form-item>

          <el-form-item label="负责人">
            <el-input v-model="UpdateForm.leader"></el-input>
          </el-form-item>
          <el-form-item label="合同编号">
            <el-input v-model="UpdateForm.ctid"></el-input>
          </el-form-item>
          <el-form-item label="工程阶段">
            <el-select v-model="UpdateForm.pnow" placeholder="工程阶段">
              <el-option
                v-for="item in pnowselect"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click=" UpdateFormVisible= false">取 消</el-button>
          <el-button type="primary" @click="handleUpdate">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="项目立项" :visible.sync="InsertFormVisible" :close-on-click-modal="true">
        <el-form :model="InsertForm" label-width="80px">
          <el-form-item label="工程名称">
            <el-input v-model="InsertForm.pjname"></el-input>
          </el-form-item>

          <el-form-item label="工程状态">
            <el-select v-model="InsertForm.state" placeholder="工程状态">
              <el-option
                v-for="item in stateselect"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="计划开始">
            <el-date-picker
              v-model="InsertForm.planstart"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择计划开工时间"
            ></el-date-picker>
          </el-form-item>
          <el-form-item label="计划完工">
            <el-date-picker
              v-model="InsertForm.planend"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择计划完工时间"
            ></el-date-picker>
          </el-form-item>

          <el-form-item label="实际开始">
            <el-date-picker
              v-model="InsertForm.actualstart"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="实际开工时间(可不填)"
            ></el-date-picker>
          </el-form-item>

          <el-form-item label="实际完工">
            <el-date-picker
              v-model="InsertForm.actualend"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="实际完工时间(可不填)"
            ></el-date-picker>
          </el-form-item>

          <el-form-item label="负责人">
            <el-input v-model="InsertForm.leader"></el-input>
          </el-form-item>
          <el-form-item label="合同编号">
            <el-input v-model="InsertForm.ctid"></el-input>
          </el-form-item>
          <el-form-item label="工程阶段">
            <el-select v-model="InsertForm.pnow" placeholder="工程阶段">
              <el-option
                v-for="item in pnowselect"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
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
let echarts = require("echarts/lib/echarts");
// 引入柱状图组件
require("echarts/lib/chart/bar");
// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/lib/component/legend");
require("echarts/lib/chart/line");
import {
  ListProject,
  AddProject,
  QueryProject,
  projectcount,
  updateproject
} from "../api/api";
import { truncate } from "fs";
import router from "../router/index";
import { homedir } from "os";
export default {
  name: "Project",
  data() {
    return {
      tip: "请输入项目名",
      aproject: "",
      xdata: [1, 2, 3],
      ydata: [10, 10, 100],
      nowpercent: 0,
      delaystart: 0,
      delayend: 0,
      accoust: 0,
      plancost: 0,
      acwork: 0,
      planwork: 0,
      progressnum: 0,
      planday: 0,
      acday: 0,
      subcost: 0,
      nowprojectname: "",
      UpdateFormVisible: false,
      stateselect: [
        {
          value: "正常",
          label: "正常"
        },
        { value: "延期", label: "延期" },
        { value: "提前", label: "提前" },
        { value: "其他", label: "其他" }
      ],
      pnowselect: [
        {
          value: "未开工",
          label: "未开工"
        },
        { value: "施工中", label: "施工中" },
        { value: "已完工", label: "已完工" },
        { value: "其他", label: "其他" }
      ],
      Project: [],
      id: "123",
      PageInfo: 1,
      currentPage: 1,
      nowid: "",
      dialogTableVisible: false,
      InsertFormVisible: false,
      InsertForm: {
        pjname: "",
        state: "",
        planstart: "",
        planend: "",
        actualstart: "",
        actualend: "",
        leader: "",
        ctid: "",
        pnow: ""
      },
      UpdateForm: {
        id: "",
        pjname: "",
        state: "",
        planstart: "",
        planend: "",
        actualstart: "",
        actualend: "",
        leader: "",
        ctid: "",
        pnow: ""
      },

      option: {
        legend: {
          data: ["计划给予", "当前进度计划", "当前消耗"]
        },
        xAxis: {
          type: "category", // 还有其他的type，可以去官网喵两眼哦
          data: ["时长(天)", "花费(万)", "人工(人/天)"], // x轴数据
          name: "资源类型", // x轴名称
          // x轴名称样式
          nameTextStyle: {
            fontWeight: 600,
            fontSize: 18
          }
        },
        yAxis: {
          type: "value",
          name: "消耗值", // y轴名称
          // y轴名称样式
          nameTextStyle: {
            fontWeight: 600,
            fontSize: 18
          }
        },
        tooltip: {
          trigger: "axis" // axis   item   none三个值
        },
        series: [
          {
            name: "计划给予",
            data: [],
            type: "line"
          },
          {
            name: "当前进度计划",
            data: [],
            type: "line"
          },
          {
            name: "当前消耗",
            data: [],
            type: "line"
          }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  mounted() {},
  methods: {
    handdle(row) {
      this.aproject = row.id;

      this.nowprojectname = row.pjname;
      this.dialogTableVisible = true;
      this.$nextTick(() => {
        this.drawLine();
      });
      // this.drawLine();
      this.dialogTableVisible = true;
    },

    getList() {
      ListProject(1)
        .then(response => {
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
    routerto() {
      this.$router.push({
        path: "/progress",
        query: { projectid: this.aproject }
      });
    },
    ClickInsert() {
      this.InsertFormVisible = true;
      console.log("项目立项");
    },
    handleInsert() {
      console.log(this.InsertForm);
      AddProject(this.InsertForm)
        .then(response => {
          this.InsertFormVisible = false;
          alert("项目添加成功!");
          this.getList();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    SeachClick() {},
    ClickUpdate(row) {
      this.UpdateFormVisible = true;
      this.UpdateForm = Object.assign({}, row);
    },
    handleUpdate() {
      this.dialogTableVisible = false;
      this.UpdateForm.id = this.aproject;
      updateproject(this.UpdateForm)
        .then(response => {
          this.UpdateFormVisible = false;
          alert("项目修改成功!");
          this.getList();
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    drawLine() {
      projectcount(this.aproject)
        .then(response => {
          this.$set(this.option.series[0],'data',response.data.all);
          this.$set(this.option.series[1],'data',response.data.plan);
          this.$set(this.option.series[2],'data',response.data.now);
          // this.option.series[0].data = response.data.all;
          // this.option.series[1].data = response.data.plan;
          // this.option.series[2].data = response.data.now;
          this.nowpercent = response.data.percent;
          this.delaystart = response.data.delaystart;
          this.delayend = response.data.delayend;
          this.accoust = response.data.accoust;
          this.plancost = response.data.plancost;
          this.acwork = response.data.acwork;
          this.planwork = response.data.planwork;
          this.progressnum = response.data.progressnum;
          this.planday = response.data.pday;
          this.acday = response.data.aday;
          this.subcost = response.data.subcost;
          console.log(response.data);
          //请求正确时执行的代码
           let myChartline = echarts.init(document.getElementById("myChartline"));
      myChartline.setOption(this.option);
        })
        .catch(function(response) {
          console.log(response); //发生错误时执行的代码
        });

     
      this.dialogTableVisible = false;
      this.dialogTableVisible =true;
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


