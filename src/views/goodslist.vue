<template>
<div>
    <el-input
      :placeholder="tip"
      v-model="nowid"
      style="width: 280px;"
      class="filter-item"
      prefix-icon="el-icon-search"
      @keyup.enter.native="SeachClick"
    />
    <el-button type="success" round @click="SeachClick">查询</el-button>
  <el-select v-model="nowstate" placeholder="全部" style="width: 200px" @change="getUserInfo">
      <el-option v-for="item in Selects" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <el-button type="text" @click="dialogTableVisible = true">仓储变动情况</el-button>
  <el-table :data = tableDate style="width: 75%">
    <el-table-column label="货物编号" prop="id"></el-table-column>
    <el-table-column label="名称" prop="name"></el-table-column>
    <el-table-column label="数量" prop="number"></el-table-column>
    <el-table-column label="单位" prop="units"></el-table-column>
    <el-table-column label="类型" prop="type"></el-table-column>
    <el-table-column label="最近变动" prop="latelynum"></el-table-column>
    <el-table-column label="变动时间" prop="latelydate" width="180"></el-table-column>
    <el-table-column label="管理员" prop="admin"></el-table-column>
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

<el-dialog title="仓储变动记录" :visible.sync="dialogTableVisible" customClass="customWidth">
  <el-table :data="goodsflow">
    <el-table-column property="id" label="编号" width="150"></el-table-column>
    <el-table-column property="goodsid" label="姓名" width="200"></el-table-column>
      <el-table-column property="name" label="姓名" width="200"></el-table-column>
    <el-table-column property="num" label="地址"></el-table-column>
     <el-table-column property="date" label="日期" width="100"></el-table-column>
      <el-table-column property="admin" label="管理员" width="100"></el-table-column>
       <el-table-column property="descs" label="描叙" width="100"></el-table-column>
    
  </el-table>
  <div class="block">
      <span class="demonstration"></span>
      <el-pagination
        @current-change="handlediaCurrentChange"
        :current-page="diacurrentPage"
        layout="total, prev, pager, next"
        :total="diaPageInfo"
      >
        <!-- data="tableData.slice((currentPage-1)pagesize,currentPagepagesize)"； -->
      </el-pagination>
    </div>
</el-dialog>

</div>
</template>


<script>
import  {getGoods}  from "../api/api";
export default {
        data () {
            return {
                tableDate: [],
                goodsflow:[],
                Selects:[{value:"",label:"其他"},{value:1,label:"材料"},{value:2,label :"设备"},{value:3,label:"其他"}],
                nowid:"",
                dialogTableVisible:false,
                diacurrentPage:1,
                diaPageInfo:1,
                currentPage:1,
                PageInfo:1,
                nowstate:"",
                tip:"请输入物品编号",   
            };
        },
       
        created () {
            this.getUserInfo();
        },
        watch: {

        },
        computed: {

        },
        methods: {
            getUserInfo () { //请求用户信息
              getGoods().then((response)=> {
                    this.tableDate = response.data;
                }).catch(function (error) {
                    console.log(error);
                });
            },
            SeachClick(){

            },
            handleCurrentChange(){

            },
            handlediaCurrentChange(){

            }
            
        }
    }
</script>
<style>
       .customWidth{
        width:120%;
    }
      </style>