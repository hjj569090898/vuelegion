<template>
  <div>
    <el-input
      :placeholder="tip"
      v-model="searchid"
      style="width: 280px;"
      class="filter-item"
      prefix-icon="el-icon-search"
      @keyup.enter.native="SeachClick()"
    />

    <el-select v-model="searchtype" placeholder="全部" style="width: 200px" @change="getInfo">
      <el-option v-for="item in Selects" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
  <el-button type="success" @click="SeachClick()">查询</el-button>
    <el-table :data="Finances" style="width: 85%">
      <el-table-column label="账单编号" prop="id"></el-table-column>
      <el-table-column label="金额" prop="money">
        <template slot-scope="scope">
          <span v-if="scope.row.money >=0" style="color: #0000FF">{{ scope.row.money }}</span>
          <span v-else-if="scope.row.money < 0" style="color: red">{{ scope.row.money }}</span>
          <span v-else style="color: #37B328">{{ scope.row.money }}</span>
        </template>
      </el-table-column>
      <el-table-column label="收支类型" prop="type">
           <template slot-scope="scope">
          <span v-if="scope.row.type ==1" style="color: #0000FF">合同</span>
          <span v-else-if="scope.row.type ==2" style="color: bule">工程</span>
           <span v-else-if="scope.row.type ==3" style="color: bule">仓储</span>
            <span v-else-if="scope.row.type ==4" style="color: bule">工资</span>
          <span v-else style="color: #37B328">其他</span>
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
        tip: "请输入流水编号",
      Selects: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "仓储",
          label: "仓储"
        },
        {
          value: "合同",
          label: "合同"
        },
        { value: "个人", label: "个人" },{ value: "工资", label: "工资" }
      ],
      Finances: [],
      search: {
        type: "",
        id: ""
      },
      searchid:"",
      searchtype:"",
      PageInfo: 1,

      currentPage: []
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
      this.currentPage = 1;
      getFinance(this.searchtype, this.currentPage)
        .then(response => {
          this.Finances = response.data.Fiance;
          this.PageInfo = response.data.length;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    handleCurrentChange() {
      console.log("test");
    },
    SeachClick() {
      //查询
      if(this.searchid=="")
      {
        this.currentPage = 1;
      this.searchtype = "";
      getFinance(this.searchtype, this.currentPage)
        .then(response => {
          if(response==""){
            this.Finances = "";
          }
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
          this.Finances = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    }}
  }
};
</script>