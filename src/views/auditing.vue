<template>
    <div>
        <!-- <el-divider content-position="left">审核申请信息</el-divider> -->
<el-input
      :placeholder="tip"
      v-model="queryid"
      style="width: 280px;"
      class="filter-item"
      prefix-icon="el-icon-search"
      @keyup.enter.native="HandleSearch"
    />
    <el-button type="success" round @click="HandleSearch">查询</el-button>

    <font class="el-class">&nbsp;&nbsp;请选择申请种类</font>
 <el-select v-model="querytype" placeholder="全部" style="width: 200px" @change="getList">
      <el-option v-for="item in typeSelects" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
      <font class="el-class">&nbsp;&nbsp;请选择申请状态</font>
 <el-select v-model="querystate" placeholder="全部" style="width: 200px" @change="getList">
      <el-option v-for="item in stateSelects" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>

<!-- <el-badge :value= currentPage class="item">
  <el-button size="small">未审核</el-button>
</el-badge> -->
<el-dialog title="审核申请信息" :visible.sync="UpdateFormVisible" :close-on-click-modal="true">
      <el-form :model="UpdateForm" label-width="80px">
        <el-form-item label="审核编号">
          <el-input v-model="UpdateForm.id" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="关联编号">
          <el-input v-model="UpdateForm.linked" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="申请原因">
          <el-input v-model="UpdateForm.reason" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="申请时间">
          <el-input v-model="UpdateForm.date" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="金额" >
          <el-input-number v-model="UpdateForm.money" :disabled="true"></el-input-number>
        </el-form-item>
        <el-form-item label="申请人">
          <el-input type="textarea" v-model="UpdateForm.applicant" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="审核状态">
 <el-select v-model="UpdateForm.state" placeholder="全部" style="width: 200px" @change="getList">
      <el-option v-for="item in statejust" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
        </el-form-item>

        <el-form-item label="审核反馈">
          <el-input type="textarea" v-model="UpdateForm.advice"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="UpdateFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="HandleUpdate" >确 定</el-button>
      </div>
    </el-dialog>


   <el-table :data="listauditing"  
    @row-click="handdle"
    border style="width: 100%">
<el-table-column prop="id" label="申请编号" width="140"></el-table-column>
<el-table-column prop="linked" label="关联编号" width="160"></el-table-column>
<el-table-column prop="money" label="申请金额" width="130"></el-table-column>
<el-table-column prop="type" label="申用类型" width="130"></el-table-column>
<el-table-column prop="date" label="申请时间" width="130"></el-table-column>
<el-table-column prop="applicant" label="申请人" width="130"></el-table-column>
<el-table-column prop="state" label="申请状态" width="110">
  
     <template slot-scope="scope">
          <span v-if="scope.row.state =='审核中'" style="color: #0000FF">{{ scope.row.state }}</span>
          <span v-else-if="scope.row.state =='不通过'" style="color: red" >{{ scope.row.state }}</span>
          <span v-else style="color: #37B328">{{ scope.row.state }}</span>
        
   </template>
</el-table-column>
<el-table-column prop="admin" label="审核人" width="110"></el-table-column>
<el-table-column prop="advice" label="建议" width="110"></el-table-column>
 <el-table-column label="操作" width="110">
        <template slot-scope="scope">
          <div v-if="scope.row.state =='审核中'">
          <el-button
            @click="ClickUpdate(scope.row)"
            type="text"
            size="medium"
            icon="el-icon-edit-outline"
          >审核</el-button>
          </div>

          <div v-if="scope.row.state !='审核中'">
          <el-button
            @click="ClickUpdate(scope.row)"
            type="text"
            size="medium"
            icon="el-icon-edit-outline"
            disabled
          >已审核</el-button>
          </div>
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
        @current-change="handlePageChange"
        :current-page="currentPage"
        layout="total, prev, pager, next"
        :total="PageInfo"
      >
        <!-- data="tableData.slice((currentPage-1)pagesize,currentPagepagesize)"； -->
      </el-pagination>

    </div>
    </div>
</template>
<script>
import { 
          getauditing,
          queryauditing,
          auditi
    } from "../api/api";
import { throws } from 'assert';
export default {
    data(){
        return {
            tip:"请输入申请号/申请人",
            queryid:"",
            listauditing:[],
             currentPage: 1,
             PageInfo:1,
            querytype:"",
            querystate:"",
            UpdateFormVisible:false,
            nowuser:"",
            autiable:true,
            typeSelects:[{
          value: "",
          label: "全部"
        },
        {
          value: "仓储入库",
          label: "仓储申用"
        },
        // {
        //   value: "项目申用",
        //   label: "项目申用"
        // },
        { value: "个人", label: "个人申用" }], 
         stateSelects:[{
          value: "", label: "全部" },
        {
          value: "审核中",
          label: "审核中"
        },
        {
          value: "不通过",
          label: "不通过"
        },
        { value: "通过", label: "通过" }],
        statejust:[
        {
          value: "审核中",
          label: "审核中"
        },
        {
          value: "不通过",
          label: "不通过"
        },
        { value: "通过", label: "通过" }],
        UpdateForm: {
        id: "",
        linked: "",
        // goodsname:"",
        // now_num:"",
        reason: "",
        money: 0,
        type: "",
        state:"",
        applicant:"" ,
        date:"",
        adate:"",
        advice:"无",
        reason:"",
      },
        }
    },
      created() {
    this.getList();
  },
   computed: {
    user() {
      return this.$store.getters.user;
    }
  },
   methods: {
     getList(){
        getauditing(this.querytype,this.querystate,this.currentPage).then(response => {
          this.listauditing = response.data.auditing;
          this.PageInfo = response.data.length;
          // this.PageInfo = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
     },
    handdle(){
      //行点击
      console.log("行点击了");
    },
     ClickUpdate(row) {
      this.UpdateFormVisible = true;
      this.UpdateForm = Object.assign({}, row);
    },
    HandleUpdate() {
      this.nowuser = localStorage.getItem("User");
      // this.UpdateForm.adate = new Date();
      var myDate = new Date();
      this.UpdateForm.adate = myDate.toLocaleString( );
      auditi(this.UpdateForm.id,this.UpdateForm.state,this.nowuser,this.UpdateForm.adate,this.UpdateForm.advice).then(res => {
        this.UpdateFormVisible = false;
        alert("修改成功！");
        this.getList();
      }) .catch(function(error) {
          console.log(error);
        });
    },
    handlePageChange(value)
    {
      this.currentPage =value;
      this.getList();
    },
    HandleSearch(){
      if(this.queryid==""){
        this.getList();
      }
      else{
      queryauditing(this.queryid).then(response => {
          this.listauditing = response.data;
          this.PageInfo = 1;
          // this.PageInfo = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
      //搜索
    }
    }
   }

}
</script>
