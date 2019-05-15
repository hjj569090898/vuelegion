<template>
  <div>
    <el-input
      :placeholder="tip"
      v-model="searchid"
      style="width: 280px;"
      class="filter-item"
      prefix-icon="el-icon-search"
      @keyup.enter.native="SeachClick"
    />
<el-button type="success" @click="SeachClick">查找账单</el-button>
    <el-select v-model="searchtype" placeholder="请选择类型" style="width: 200px" @change="getInfo">
      <el-option v-for="item in Selects" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
  
    <el-table :data="Finances" style="width: 85%">
      <el-table-column label="账单编号" prop="id"></el-table-column>
      <el-table-column label="金额" prop="money">
        <template slot-scope="scope">
          <span v-if="scope.row.type =='合同结算'" style="color: #37B328">+{{ scope.row.money }}</span>
          <span v-else-if="scope.row.type !='合同结算'" style="color: red">-{{ scope.row.money }}</span>
          <span v-else style="color: #37B328">{{ scope.row.money }}</span>
        </template>
      </el-table-column>
      <el-table-column label="收支类型" prop="type">
           <template slot-scope="scope">
          <span v-if="scope.row.type =='合同结算'" style="color: #0000FF">合同</span>
          <span v-else-if="scope.row.type =='个人'" style="color: bule">个人报销</span>
           <span v-else-if="scope.row.type =='仓储入库'" style="color: red">仓储</span>
          <span v-else style="color: #37B328">{{scope.row.type}}</span>
        </template>
      </el-table-column>
      <el-table-column label="描述" prop="descs"></el-table-column>
      <el-table-column label="审核人" prop="admin"></el-table-column>
      <el-table-column label="时间" prop="date"></el-table-column>
    </el-table>
    <div class="block">
      <span class="demonstration"></span>
      <el-pagination
        @current-change="handleCurrentChange"
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
import { getFinance,
searchFinance } from "../api/api";
export default {
  data() {
    return {
        tip: "请输入账单流水编号",
      Selects: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "仓储入库",
          label: "仓储"
        },
        {
          value: "合同结算",
          label: "合同"
        },
        { value: "个人", label: "个人" }
      ],
      Finances: [],
      search: {
        type: "",
        id: ""
      },
      searchid:"",
      searchtype:"",
      PageInfo: 1,

      currentPage:1,
    };
  },
  UpdateForm: {
    money: ""
  },

  created() {
    this.getInfo();
  },
  watch: {},
  computed: {},
  methods: {
    getInfo() {
      
      getFinance(this.searchtype, this.currentPage)
        .then(response => {
          this.Finances = response.data.Fiance;
          this.PageInfo = response.data.length;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    
    handleCurrentChange(value) {
      this.currentPage = value;
      console.log(this.currentPage);
      this.getInfo();
    },
    SeachClick() {
      //查询
      if(this.searchid =="")
      {
         getFinance(this.searchtype, this.currentPage).then(response => {
          this.Finances = response.data.Fiance;
          this.PageInfo = response.data.length;
        })
        .catch(function(error) {
          console.log(error);
        });
      }
      else{
      searchFinance(this.searchid)
        .then(response => {
          if(response.data.code ==0){
            this.Finances =null;
          }
          else if(response.data.code ==1)
          {
          this.Finances = response.data.finance;
          this.PageInfo = 1;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }}
  }
};
</script>