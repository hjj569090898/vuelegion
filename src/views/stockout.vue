<template>
    <div>
        <el-divider content-position="left">审核</el-divider>

  

<el-badge :value= currentPage class="item">
  <el-button size="small">未审核</el-button>
</el-badge>


<el-dialog title="审核申请信息" :visible.sync="UpdateFormVisible" :close-on-click-modal="true">
      <el-form :model="UpdateForm" label-width="80px">
        <el-form-item label="审核编号">
          <el-input v-model="UpdateForm.id" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="物品编号">
          <el-input v-model="UpdateForm.goodsid" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="申请数量">
          <el-input-number v-model="UpdateForm.applynum" :disabled="true"></el-input-number>
        </el-form-item>
        <el-form-item label="申请原因">
          <el-input v-model="UpdateForm.reason" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="清单编号">
          <el-input v-model="UpdateForm.progoodsid" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="工程编号" >
          <el-input v-model="UpdateForm.projectid" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="申请时间">
          <el-input type="textarea" v-model="UpdateForm.date" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="审核状态">
 <el-select v-model="UpdateForm.state" placeholder="全部" style="width: 200px">
      <el-option v-for="item in statejust" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="UpdateFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="HandleUpdate" >确 定</el-button>
      </div>
    </el-dialog>




   <el-table :data="listgoodsapply"  
    border style="width: 100%">
<el-table-column prop="id" label="编号" width="140"></el-table-column>
<el-table-column prop="goodsid" label="商品编号" width="160"></el-table-column>
<el-table-column prop="applynum" label="申请数量" width="130"></el-table-column>
<el-table-column prop="projectid" label="工程编号" width="130"></el-table-column>
<el-table-column prop="date" label="申请时间" width="130"></el-table-column>
<el-table-column prop="reason" label="申请原因" width="130"></el-table-column>
<!-- <el-table-column prop="progoodsid" label="申请" width="130"></el-table-column> -->
<el-table-column prop="state" label="申请状态" width="110">
  
     <template slot-scope="scope">
          <span v-if="scope.row.state =='审核中'" style="color: #0000FF">{{ scope.row.state }}</span>
          <span v-else-if="scope.row.state =='不通过'" style="color: red" >{{ scope.row.state }}</span>
          <span v-else style="color: #37B328">{{ scope.row.state }}</span>
        
   </template>
</el-table-column>
<el-table-column prop="admin" label="审核人" width="110"></el-table-column>
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
          get,
          queryauditing,
          auditi,
          listGoodsApply,
          audiGoodsApply,
    } from "../api/api";
import { throws } from 'assert';
export default {
    data(){
        return {
            
            listgoodsapply:[],
             currentPage: 1,
             PageInfo:1,
            UpdateFormVisible:false,
            nowuser:"",
            autiable:true,
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
        goodsid: 0,
        projectid:0,
        progoodsid:0,
        // goodsname:"",
        // now_num:"",
        reason: "",
        state:"",
        admin:"" ,
        date:"",

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
        listGoodsApply(this.currentPage).then(response => {
          this.listgoodsapply = response.data.GoodsApply;
          this.PageInfo = response.data.length;
          // this.PageInfo = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
     },
     ClickUpdate(row) {
      this.UpdateFormVisible = true;
      this.UpdateForm = Object.assign({}, row);
    },
    HandleUpdate() {
      this.UpdateForm.admin = localStorage.getItem("User");
      // this.UpdateForm.adate = new Date();
      var myDate = new Date();
      this.UpdateForm.date = myDate.toLocaleString( );;
      audiGoodsApply(this.UpdateForm).then(res => {
        this.UpdateFormVisible = false;
        alert("审核成功！");
      }) .catch(function(error) {
          console.log(error);
        });
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
