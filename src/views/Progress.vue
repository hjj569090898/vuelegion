<template>
<div>
    <el-tabs :tab-position="tabPosition">
      <el-tab-pane label="任务清单">
       <el-button
      type="primary"
            icon="el-icon-edit-outline"
             @click="ClickInsert"
          >+添加任务</el-button>

     <el-table :data="Progress"  
    border style="width: 100%">
<el-table-column prop="prname" label="任务名" width="150"></el-table-column>
<el-table-column prop="planstart" label="计划开始时间" width="110"></el-table-column>
<el-table-column prop="planend" label="计划结束时间" width="110"></el-table-column>
<el-table-column prop="actualstart" label="实际开始时间" width="110"></el-table-column>
<el-table-column prop="actualend" label="实际结束时间" width="110"></el-table-column>
<el-table-column prop="plancost" label="计划花费" width="80"></el-table-column>
<el-table-column prop="actualcost" label="当前/实际花费" width="80">
<template slot-scope="scope">
          <span v-if="scope.row.actualcost  == scope.row.plancost" style="color: #0000FF">{{ scope.row.actualcost }}</span>
          <span v-else-if="scope.row.actualcost  >= scope.row.plancost" style="color: red">{{ scope.row.actualcost }}</span>
          <span v-else style="color: #37B328">{{ scope.row.actualcost }}</span>
        </template>
</el-table-column>
<el-table-column prop="planworking" label="计划人工" width="80"></el-table-column>
<el-table-column prop="actualworking" label="当前人工" width="80">
  <template slot-scope="scope">
          <span v-if="scope.row.actualworking  == scope.row.planworking" style="color: #0000FF">{{ scope.row.actualworking }}</span>
          <span v-else-if="scope.row.actualworking  >= scope.row.planworking" style="color: red">{{ scope.row.actualworking }}</span>
          <span v-else style="color: #37B328">{{ scope.row.actualworking }}</span>
        </template>
</el-table-column>
<el-table-column prop="subcontractcost" label="分包费用" width="80"></el-table-column>

<el-table-column prop="state" label="状态" width="90"></el-table-column>
 <el-table-column label="操作" width="140">
        <template slot-scope="scope">
           <el-button @click="ClickList(scope.row)"
            type="text"
             size="medium"
              icon="el-icon-view">任务详情</el-button>
      
          <el-button
            type="text"
            size="medium"
              @click="ClickDeleteProgress(scope.row.id)"
            icon="el-icon-delete"
          >删除</el-button>
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
    </div>
      </el-tab-pane>

      
       <el-tab-pane label="物资清单">

         <el-button
          type="primary"
            icon="el-icon-edit-outline"
             @click="clickaddgoods"
          >+新增物资需求</el-button>

           <el-table :data="Pjgoods"  
    border style="width: 100%">
<el-table-column prop="id" label="编号" width="160"></el-table-column>
<el-table-column prop="goodsid" label="物品编号" width="130"></el-table-column>
<el-table-column prop="name" label="物品名称" width="130"></el-table-column>
<el-table-column prop="plannum" label="计划数量" width="130"></el-table-column>
<el-table-column prop="actualnum" label="当前数量" width="130">

<template slot-scope="scope">
          <span v-if="scope.row.actualnum == scope.row.plannum" style="color: #0000FF">{{ scope.row.actualnum }}</span>
          <span v-else-if="scope.row.actualnum >= scope.row.plannum" style="color: red">{{ scope.row.actualnum }}</span>
          <span v-else style="color: #37B328">{{ scope.row.actualnum }}</span>
        </template>

</el-table-column>
<el-table-column prop="applynum" label="申请中的数量" width="170">

<template slot-scope="scope">
          <span v-if="(scope.row.actualnum +scope.row.applynum) == scope.row.plannum" style="color: #0000FF">{{ scope.row.applynum }}</span>
          <span v-else-if="(scope.row.actualnum +scope.row.applynum) >= scope.row.plannum" style="color: red">{{ scope.row.applynum }}</span>
          <span v-else style="color: #37B328">{{ scope.row.applynum }}</span>
        </template>

</el-table-column>
<el-table-column prop="date" label="变更时间" width="110"></el-table-column>
<el-table-column label="操作" width="220">
        <template slot-scope="scope">
          <div v-if="scope.row.applynum==0">
            <el-button @click="Clickadd(scope.row)" type="text" size="medium" icon="el-icon-view">继续添加</el-button>
            </div>
            <div v-if="scope.row.applynum!=0">
               <el-button disabled type="text" size="medium" icon="el-icon-view">等待审核</el-button>
            </div>
            <div v-if="scope.row.applynum==0 && scope.row.actualnum!=0" >
          <el-button
            @click="Clickdelete(scope.row)"
            type="text"
            size="medium"
            icon="el-icon-edit-outline"
          >物料退回</el-button>
            </div>
          <div>
            </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <span class="demonstration"></span>
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page="goodscurrentPage"
        layout="total, prev, pager, next"
        :total="PageInfo"
      >
      
        <!-- data="tableData.slice((currentPage-1)pagesize,currentPagepagesize)"； -->
      </el-pagination>
    </div>

       </el-tab-pane>

        <el-tab-pane label="现场图集">
           <el-button
          type="primary"
            icon="el-icon-edit-outline"
             @click="clickinsertimage"
          >+添加图片</el-button>
          <viewer :images="images">
	   <img v-for="src in images" :src="src" :key="src" width="300">
	</viewer>
       </el-tab-pane>

    </el-tabs>


<el-dialog title="申请物资补充" :visible.sync="addgoodsFormVisible" :close-on-click-modal="true">
      <el-form  :model="addgoodsForm"  class="demo-form-inline" label-width="80px">

         <el-form-item label="物品编号">
          <el-input v-model="addgoodsForm.goodsid" disabled></el-input>
        </el-form-item>

        <el-form-item label="预计数量">
          <el-input v-model="addgoodsForm.plannum" disabled></el-input>
        </el-form-item>

        <el-form-item label="当前已用">
          <el-input v-model="addgoodsForm.actualnum"  disabled ></el-input>
        </el-form-item>

      <el-form-item label="现在申请">
          <el-input-number v-model="addgoodsForm.applynum" ></el-input-number>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="addgoodsFormVisible = false ">取 消</el-button>
        <el-button type="primary" @click="Handleaddgoods">确 定</el-button>
      </div>
    </el-dialog>



    <!--  -->
<el-dialog title="申请物资补充" :visible.sync="deletegoodsFormVisible" :close-on-click-modal="true">
      <el-form  :model="deletegoodsForm"  class="demo-form-inline" label-width="80px">

         <el-form-item label="物品编号">
          <el-input v-model="deletegoodsForm.goodsid" disabled></el-input>
        </el-form-item>

        <el-form-item label="预计数量">
          <el-input v-model="deletegoodsForm.plannum" disabled></el-input>
        </el-form-item>

        <el-form-item label="当前已用">
          <el-input v-model="deletegoodsForm.actualnum"  disabled ></el-input>
        </el-form-item>

      <el-form-item label="现在退回">
          <el-input-number v-model="deletenum" ></el-input-number>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="deletegoodsFormVisible = false ">取 消</el-button>
        <el-button type="primary" @click="Handledeletegoods">确 定</el-button>
      </div>
    </el-dialog>
    <!--                 -->


<el-dialog title="添加任务" :visible.sync="InsertFormVisible" :close-on-click-modal="true">
      <el-form  :inline="true" :model="InsertForm" label-width="90px">
         
        <el-form-item label="任务名称">
          <el-input v-model="InsertForm.prname" width="150px"></el-input>
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

        <el-form-item label="实际开始">
          <el-date-picker
      v-model="InsertForm.actualstart"
      type="date"
      value-format="yyyy-MM-dd"
      placeholder="实际开工时间(可不填)">
    </el-date-picker>
        </el-form-item>

          <el-form-item label="实际完工">
          <el-date-picker
      v-model="InsertForm.actualend"
      type="date"
      value-format="yyyy-MM-dd"
      placeholder="实际完工时间(可不填)">
    </el-date-picker>
        </el-form-item>
        <el-form-item label="计划花费">
          <el-input  v-model="InsertForm.plancost"></el-input>
        </el-form-item>  
        <el-form-item label="实际花费">
          <el-input  v-model="InsertForm.actualcost"></el-input>
        </el-form-item>
        <el-form-item label="计划人工">
          <el-input  v-model="InsertForm.planworking"></el-input>
        </el-form-item>
        <el-form-item label="实际人工">
          <el-input  v-model="InsertForm.actualworking"></el-input>
        </el-form-item>
          <el-form-item label="其他费用">
          <el-input  v-model="InsertForm.subcontractcost"></el-input>
        </el-form-item>
        <el-form-item label="任务状态">
         <el-select  v-model="InsertForm.state"  placeholder="任务状态">
    <el-option
   v-for="item in pnowselect"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      >
    </el-option>
  </el-select>  
        </el-form-item>
        <el-form-item label="进度(%)">
          <el-input  v-model="InsertForm.percent"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="InsertFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleInsert">确 定</el-button>
      </div>
    </el-dialog>




    <el-dialog title="修改任务" :visible.sync="UpdateFormVisible" :close-on-click-modal="true">
      <el-form  :inline="true" :model="UpdateForm" label-width="90px">
         
        <el-form-item label="任务名称">
          <el-input v-model="UpdateForm.prname" width="150px"></el-input>
        </el-form-item>
<el-form-item label="计划开始">
          <el-date-picker
      v-model="UpdateForm.planstart"
      type="date"
      value-format="yyyy-MM-dd"
      placeholder="选择计划开工时间">
    </el-date-picker>
        </el-form-item>
        <el-form-item label="计划完工">
         <el-date-picker
      v-model="UpdateForm.planend"
      type="date"
      value-format="yyyy-MM-dd"
      placeholder="选择计划完工时间">
    </el-date-picker>
        </el-form-item>

        <el-form-item label="实际开始">
          <el-date-picker
      v-model="UpdateForm.actualstart"
      type="date"
      value-format="yyyy-MM-dd"
      placeholder="实际开工时间(可不填)">
    </el-date-picker>
        </el-form-item>

          <el-form-item label="实际完工">
          <el-date-picker
      v-model="UpdateForm.actualend"
      type="date"
      value-format="yyyy-MM-dd"
      placeholder="实际完工时间(可不填)">
    </el-date-picker>
        </el-form-item>
        <el-form-item label="计划花费">
          <el-input  v-model="UpdateForm.plancost"></el-input>
        </el-form-item>  
        <el-form-item label="实际花费">
          <el-input  v-model="UpdateForm.actualcost"></el-input>
        </el-form-item>
        <el-form-item label="计划人工">
          <el-input  v-model="UpdateForm.planworking"></el-input>
        </el-form-item>
        <el-form-item label="实际人工">
          <el-input  v-model="UpdateForm.actualworking"></el-input>
        </el-form-item>
          <el-form-item label="其他费用">
          <el-input  v-model="UpdateForm.subcontractcost"></el-input>
        </el-form-item>
        <el-form-item label="任务状态">
         <el-select  v-model="UpdateForm.state"  placeholder="任务状态">
    <el-option
   v-for="item in pnowselect"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      >
    </el-option>
  </el-select>  
        </el-form-item>
        <el-form-item label="进度(%)">
          <el-input  v-model="UpdateForm.percent"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="UpdateFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="HandleUpdate">确 定</el-button>
      </div>
    </el-dialog>




<el-dialog title="新增物资需求" :visible.sync="addplangoodsFormVisible" :close-on-click-modal="true">
      <el-form  :inline="true" :model="addgoodsplanForm"  class="demo-form-inline" label-width="80px">
      

 <el-select v-model="value2"  placeholder="请选择物资类型" @change="handleTypeChange">
    <el-option
      v-for="item in SelectType"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
 </el-select>

  <el-select
    v-model="addgoodsplanForm.goodsid"
    placeholder="请选择物品" >
    <el-option
      v-for="item in GoodsByType"
      :key="item.id"
      :label= item.name
      :value="item.id"
      >
    </el-option>
  </el-select>      

        <el-form-item label="预计数量">
          <el-input v-model="addgoodsplanForm.plannum" ></el-input>
        </el-form-item>

        <el-form-item label="当前所需">
          <el-input v-model="addgoodsplanForm.applynum"  ></el-input>
        </el-form-item>

     

      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="addplangoodsFormVisible = false ">取 消</el-button>
        <el-button type="primary" @click="Handleaddgoodsplan">确 定</el-button>
      </div>
    </el-dialog>
    <!-- ------------------ -->

<!-- 任务详情 ------------------------------------------------------->
    <el-dialog title="任务详情" :visible.sync="ViewFormVisible" :close-on-click-modal="true">
      <el-form  :inline="true" :model="ViewForm"  class="demo-form-inline" label-width="80px">
        <el-form-item label="入库编号">
          <el-input v-model="ViewForm.id" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="任务名称">
          <el-input v-model="ViewForm.prname" :disabled="true" ></el-input>
        </el-form-item>

        </el-form>
        <el-form :inline="true" :model="ViewForm"  class="demo-form-inline" label-width="80px">
        <el-form-item label="计划开始">
          <el-input v-model="ViewForm.planstart" :disabled="true" ></el-input>
        </el-form-item>

        <el-form-item label="计划结束">
          <el-input v-model="ViewForm.planend" :disabled="true" ></el-input>
        </el-form-item>

        <el-form-item label="计划费用">
          <el-input v-model="ViewForm.plancost" :disabled="true" ></el-input>
        </el-form-item>
      <!-- </el-form> -->

   <!-- <el-form :inline="true" :model="ViewForm"  class="demo-form-inline" label-width="80px"> -->
        <el-form-item label="实际开始">
          <el-input v-model="ViewForm.planstart" :disabled="true" ></el-input>
        </el-form-item>

        <el-form-item label="实际结束">
          <el-input v-model="ViewForm.planend" :disabled="true" ></el-input>
        </el-form-item>

        <el-form-item label="实际费用">
          <el-input v-model="ViewForm.plancost" :disabled="true" ></el-input>
        </el-form-item>

        <el-form-item label="额外费用">
          <el-input v-model="ViewForm.subcontractcost" :disabled="true" ></el-input>
        </el-form-item>

        <el-form-item label="任务状态">
          <el-input v-model="ViewForm.state" :disabled="true" ></el-input>
        </el-form-item>

        <el-form-item label="负责人">
          <el-input v-model="ViewForm.admin" :disabled="true" ></el-input>
        </el-form-item>

          <el-form-item label="进度">
          <el-input v-model="ViewForm.percent" :disabled="true" ></el-input>
        </el-form-item>

        <el-form-item label="最近更新">
          <el-input v-model="ViewForm.date" :disabled="true" ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
       
          <div class="div-inline" v-if="this.ViewForm.state!='已完工'">
            <el-button type="primary" @click="ClickUpdate">修改信息</el-button>
            </div>
            <div class="div-inline" v-if="this.ViewForm.state =='已完工'">
             <el-button type="primary" @click="ClickUpdate" disabled>已完工</el-button>
            </div>
            <div class="div-inline"> 
        <el-button type="success"  @click="ViewFormVisible = false ">确 定</el-button>
        </div>

        </div>
      
    </el-dialog>


<!-- <el-dialog title="添加图片" :visible.sync="ImageFormVisible" :close-on-click-modal="true">
      <el-form :model="UpdateForm" label-width="80px">
         <el-button type="primary" @click="addimage">添加图片+</el-button>
        <el-form-item label="入库编号">
          <el-input v-model="UpdateForm.id" :disabled="true"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="UpdateFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="HandleUpdate">确 定</el-button>
      </div>
    </el-dialog> -->



<el-dialog title="添加图片" :visible.sync="addimageFormVisible" :close-on-click-modal="true">
    
    <el-upload
  class="upload-demo"
  :action="imageurl"
  :on-preview="handlePreview"
  :on-remove="handleRemove"
  :file-list="fileList"
  list-type="picture">
  <el-button size="small" type="primary">点击上传</el-button>
  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>

    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  
      <div slot="footer" class="dialog-footer">
        <!-- <el-button @click="addimageFormVisible = false">取 消</el-button> -->
        <!-- <el-button type="" @click="onSubmit">提交</el-button> -->
        <el-button type="primary" @click="Handleupload">添加完成 </el-button>
      </div>
    </el-dialog>

</div>
</template>
<script>
import { 
          QueryProject,
          listProgress,
          uploadimage,
          AddProgress,
          listpjGoods,
          getimageurl,
          GoodsByType,
          AddProgoods,
          deleteprojectgoods,
          addprojectgoods,
          updateprogress,
          DeleteProgress,
    } from "../api/api";
export default {
    data(){
        return {
            pnowselect:[{
        value:"未开工",
        label:"未开工"
      },{value:"施工中",label:"施工中"},{value:"已完工",label:"已完工"},{value:"其他",label:"其他"}],
        param: new FormData(),
            projectid:"",
            fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
      ,
            Project:[],
            tabPosition: 'top',
            Pjgoods:[],
            Progress:[],
             activeNames: ['1'],
             currentPage:1,
             imageurl:"http://localhost:8083/upload/"+this.$route.query.projectid,
              fileList:[],
              
        dialogImageUrl:'',
        images:[],
        addgoodsForm:{
          id:"",
          goodsid:"",
          plannum:"",
          actualnum:"",
          projectid:this.$route.query.projectid,
          date:"",
          applynum:""
        },
         deletegoodsForm:{
          id:"",
          goodsid:"",
          plannum:"",
          actualnum:"",
          projectid:this.$route.query.projectid,
          date:"",
          applynum:""
        },
         SelectType:[
        {
          value:"1",
          label:"材料"
        },
        {
          value:"2",
          label:"设备"
        }
      ],
      GoodsByType:[]
        ,

             PageInfo:1,
             goodscurrentPage:1,
             UpdateFormVisible:false,
             ViewFormVisible:false,
             InsertFormVisible:false,
             addimageFormVisible:false,
             dialogVisible:false,
             ImageFormVisible:false,
             addplangoodsFormVisible:false,
             UpdateForm:{
              id:"",
              prname:"",
              planstart:"",
              planend:"",
              actualstart:"",
              actualend:"",
              plancost:"",
              actualcost:"",
              planworking:"",
              actualworking:"",
              subcontractcost:"",
              percent:"",
              state:"",
              admin :localStorage.getItem('User'),
             },
             ViewForm:{
               id:"",
              prname:"",
              planstart:"",
              planend:"",
              actualstart:"",
              actualend:"",
              plancost:"",
              actualcost:"",
              planworking:"",
              actualworking:"",
              subcontractcost:"",
              percent:"",
              state:"",
             },
             Insertpjgoods:{
                id:"",
             },
             addgoodsFormVisible:false,
             deletegoodsFormVisible:false,
             addgoodsplanForm:{
               goodsid:"",
               plannum:"",
               actualnum:0,
               applynum:"",
               projectid:"",
               date:""

             },
             deletenum:0,
             value2:"",
             InsertForm:{
              prname:"",
              planstart:"",
              planend:"",
              actualstart:"",
              actualend:"",
              plancost:"",
              actualcost:"",
              planworking:"",
              actualworking:"",
              subcontractcost:"",
              percent:"",

              state:"",
              projectid:"",
              admin:"",
              date:"1"
             },
        }
    },
    created() {
    this.getList();
    this.getprogress();
    this.getPjgoods();
    this.getimage();
  },
  methods: {
      getList(){
          this.projectid =this.$route.query.projectid;
          QueryProject(this.projectid).then(response => {
          this.Project = response.data;
        })
        .catch(function(error) {
          console.log(error);
        });
      },
      getimage(){
        getimageurl(this.$route.query.projectid).then(response => {
          this.images = response.data.imageurl;
          console.log(response.data);
          console.log(this.images);
        })
        .catch(function(error) {
          console.log(error);
        });
      },
      getPjgoods(){
        listpjGoods(this.$route.query.projectid,this.goodscurrentPage).then(response => {
          this.Pjgoods = response.data.Progoods;
          this.goodscurrentPage = response.data.page;
        })
        .catch(function(error) {
          console.log(error);
        });
      },
      getprogress(){
        listProgress(this.projectid,this.currentPage).then(response => {
          this.Progress = response.data.Project;
          this.PageInfo =response.data.page;
        })
        .catch(function(error) {
          console.log(error);
        });
      },
       handleChange(val) {
        console.log(val);
      },
      handleCurrentChange(){

      },
      ClickList(row){
          this.ViewFormVisible=true;
          this.ViewForm = Object.assign({}, row);
         
      },
      ClickUpdate(){
      this.UpdateFormVisible = true;
      
      // this.UpdateForm = Object.assign({}, row);
      this.UpdateForm =this.ViewForm;
    
      },
      HandleUpdate(){
        updateprogress(this.UpdateForm).then(response => {
           if(response.data ==1){
          this.UpdateFormVisible = false;
          this.getprogress();
          alert("修改成功")
           }
        })
        .catch(function(error) {
          console.log(error);
        });
      },
       ClickInsert(){
         this.InsertFormVisible = true;
       },
       handleInsert(){
         this.InsertForm.admin = localStorage.getItem("User");
         this.InsertForm.projectid = this.$route.query.projectid;
         AddProgress(this.InsertForm).then(response => {
           if(response.data ==1){
          this.InsertFormVisible = false;
          this.getprogress();
          alert("添加成功")
           }
        })
        .catch(function(error) {
          console.log(error);
        });
      },
      addimage(){
        this.addimageFormVisible = true;
      },
         OnChange(file,fileList){
        this.fileList=fileList
 
      },
      handleTypeChange:function(val)
    {
      this.chooseType =val;
      GoodsByType(this.chooseType).then(response =>{
        this.GoodsByType = response.data;
      })
      .catch(function(error) {
          console.log(error);
        });
    },
      OnRemove(file,fileList){
        this.fileList=fileList
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      Handleupload(file){
          // this.param.append("id",this.UpdateForm.id)    
          // this.param.append("file",this.file)  
        // uploadimage(this.$route.query.projectid,this.param) 
          // .then(res=>{
            // console.log(res);
            this.getimage();
            this.addimageFormVisible =false;
            
          // })
          // addimageFormVisible = false;
      },
      ClickDeleteProgress(id) {
      this.$confirm("是否删除该任务信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          DeleteProgress(id)
            .then(response => {
              this.getprogress();
              this.$message({
            type: "success",
            message: "删除成功!"
          });
        
            })
            .catch(function(error) {
              console.log(error);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
        
    },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      clickinsertimage(){
        this.addimageFormVisible = true;
      },
      clickaddgoods(){
        this.addplangoodsFormVisible = true;
      },
      Clickadd(row){
          this.addgoodsFormVisible =true;
          this.addgoodsForm = Object.assign({}, row);
      },
         Clickdelete(row){
          this.deletegoodsFormVisible =true;
          this.deletegoodsForm = Object.assign({}, row);
      },
      Handleaddgoodsplan(){
        this.addgoodsplanForm.projectid =this.$route.query.projectid;
          AddProgoods(this.addgoodsplanForm).then(response =>{
        if(response.data.code =="1")
        {
          alert("添加申请成功！")
          this.getPjgoods();
          this.addplangoodsFormVisible =false;
        }
      })
      .catch(function(error) {
          console.log(error);
        });
      },
      Handleaddgoods(){
        this.addgoodsForm.projectid = this.$route.query.projectid;
        addprojectgoods(this.addgoodsForm).then(response =>{
        if(response.data.code =="1")
        {
          alert("申请成功提交！")
          this.addplangoodsFormVisible =false;
          this.getPjgoods();
        }
      })
      .catch(function(error) {
          console.log(error);
        });
       
      },
      Handledeletegoods(){
          deleteprojectgoods(this.deletenum,localStorage.getItem("User"),this.deletegoodsForm).then(response =>{
        if(response.data.code =="1")
        {
          alert("物品成功退回")
          this.deletegoodsFormVisible =false;
        }
      })
      .catch(function(error) {
          console.log(error);
        });
          

          
      },
  }
}
</script>
<style>
.div-inline{ display:inline} 
</style>

