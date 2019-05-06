<template>
    <div>
        
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



   <el-table :data="listauditing"  
    @row-click="handdle"
    border style="width: 100%">
<el-table-column prop="id" label="申请编号" width="140"></el-table-column>
<el-table-column prop="linked" label="关联编号" width="160"></el-table-column>
<el-table-column prop="money" label="申请金额" width="130"></el-table-column>
<el-table-column prop="type" label="申用类型" width="130"></el-table-column>
<el-table-column prop="date" label="申请时间" width="130"></el-table-column>
<el-table-column prop="applicant" label="申请人" width="130"></el-table-column>
<el-table-column prop="state" label="申请状态" width="110"></el-table-column>
<el-table-column prop="admin" label="审核人" width="110"></el-table-column>
<el-table-column prop="advice" label="建议" width="110"></el-table-column>
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
        @current-change="getList"
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
          queryauditing
    } from "../api/api";
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
            typeSelects:[{
          value: "",
          label: "全部"
        },
        {
          value: "仓储申用",
          label: "仓储申用"
        },
        {
          value: "项目申用",
          label: "项目申用"
        },
        { value: "个人申用", label: "个人申用" }], 
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
        }
    },
      created() {
    this.getList();
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
