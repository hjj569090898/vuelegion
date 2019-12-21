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
  <!-- <el-select v-model="nowstate" placeholder="全部" style="width: 200px" @change="getUserInfo">
      <el-option v-for="item in Selects" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select> -->
    <!-- <el-button type="text" @click="dialogTableVisible = true">仓储变动情况</el-button> -->

    <el-button type="success" @click="Clickadd">+仓储入库</el-button>

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
        :total="PageInfo">
      </el-pagination>
    </div>


    <el-dialog title="物资入仓" :visible.sync="addgoodsFormVisible" :close-on-click-modal="true">
      <el-form  :model="addgoodsForm"  class="demo-form-inline" label-width="80px">

         <el-form-item label="物品名称">
          <el-input v-model="addgoodsForm.name" ></el-input>
        </el-form-item>

        <el-form-item label="入仓数量">
          <el-input-number v-model="addgoodsForm.number" ></el-input-number>
        </el-form-item>

        <el-form-item label="物品单价">
          <el-input v-model="money"   ></el-input>
        </el-form-item>

      <el-form-item label="物品单位">
          <el-input v-model="addgoodsForm.units" placeholder="个/辆/件/米/公斤" ></el-input>
        </el-form-item>

        
          <el-form-item label="选择类型">
                  <el-select
                    v-model="addgoodsForm.type"
                    style="width: 280px;"
                    placeholder="请选择部门"
                  >
                    <el-option
                      v-for="item in types"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </el-form-item>

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="addgoodsFormVisible = false ">取 消</el-button>
        <el-button type="primary" @click="Handleaddgoods">确 定</el-button>
      </div>
    </el-dialog>

<el-dialog title="仓储变动记录" :visible.sync="dialogTableVisible" width="60%" :close-on-click-modal="true">
  <el-table :data="goodsflow">
    <el-table-column property="id" label="编号" width="150"></el-table-column>
    <el-table-column property="goodsid" label="物品编号" width="120"></el-table-column>
    <el-table-column property="num" label="数量变化" width="120"></el-table-column>
     <el-table-column property="date" label="日期" width="210"></el-table-column>
      <el-table-column property="admin" label="管理员" width="100"></el-table-column>
       <el-table-column property="descs" label="描叙" width="160"></el-table-column>
    
  </el-table>
  <div class="block">
      <span class="demonstration"></span>
      <el-pagination
        @current-change="handlegoodsflowCurrentChange"
        :current-page="nowpage"
        layout="total, prev, pager, next"
        :total="allcount" >
      </el-pagination>
    </div>
</el-dialog>

</div>
</template>


<script>
import  {getGoods,
        getgoodsflow,
        goodsbyid,
        GoodsIn,
}  from "../api/api";
export default {
        data () {
            return {
              nowpage:1,
              allcount:0,
              nowname:"",
                tableDate: [],
                goodsflow:[],
                types:[{value:"1",label:"材料"},{value:2,label :"设备"}],
                addgoodsForm:{
                  name:"",
                  number:"",
                  units:"",
                  type:"",
                  latelynum:"",
                  latelydate:"",
                  admin:""
                },
                money:"",
                Selects:[{value:"",label:"其他"},{value:1,label:"材料"},{value:2,label :"设备"},{value:3,label:"其他"}],
                nowid:"",
                dialogTableVisible:false,
                addgoodsFormVisible:false,
                diacurrentPage:1,
                diaPageInfo:1,
                currentPage:1,
                PageInfo:1,
                nowstate:"",
                tip:"请输入物品编号",   
                tips:"请输入物品名称",  
            };
        },
       
        created () {
            this.getUserInfo();
            this.getflow();
        },
        watch: {

        },
        computed: {

        },
        methods: {
            getUserInfo () { 
              console.log(this.currentPage);
              getGoods(this.currentPage).then((response)=> {
                    this.tableDate = response.data.goods;
                    this.PageInfo =response.data.length;
                }).catch(function (error) {
                    console.log(error);
                });
            },
            getflow(){
              getgoodsflow(this.nowpage).then((response)=> {
                    this.goodsflow = response.data.goodsflow;
                    this.allcount = response.data.length;
                }).catch(function (error) {
                    console.log(error);
                });
            },
            SeachClick(){
              if(this.nowid ==""){
                this.getUserInfo();
              }
              else{
                goodsbyid(this.nowid).then((response)=> {
                    this.tableDate = response.data;
                    this.PageInfo = 1 ;
                }).catch(function (error) {
                    console.log(error);
                });
            }
            },
            handleCurrentChange(val){
              this.currentPage = val;
              this.getUserInfo();
            },
            handlediaCurrentChange(){
                this.getflow();
            },
            handlegoodsflowCurrentChange(val){
              this.nowpage =val;
           this.getflow(); 
        },
        Clickadd()
        {
            this.addgoodsFormVisible =true;
        },
        Handleaddgoods(){
          this.addgoodsForm.admin = localStorage.getItem("User");
          GoodsIn(this.money,this.addgoodsForm).then((response)=> {
                    if(response.data ==1)
                    {
                      alert("入库成功！");
                      this.addgoodsFormVisible=false;
                      this.getUserInfo();
                    }
                }).catch(function (error) {
                    console.log(error);
                });
        }
    }
}
</script>
<style>
    
      </style>