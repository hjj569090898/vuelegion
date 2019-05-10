<template>
<div>


      <el-collapse v-model="activeNames" @change="handleChange">
  <el-collapse-item title= "工程内容(点击查看)" name="1">
  
  </el-collapse-item>
  <el-collapse-item title= "物资统计(点击查看)" name="2">

 <el-table :data="Pjgoods"  
    border style="width: 100%">
<el-table-column prop="id" label="编号" width="160"></el-table-column>
<el-table-column prop="goodsid" label="物品编号" width="130"></el-table-column>
<el-table-column prop="goodsname" label="物品名称" width="130"></el-table-column>
<el-table-column prop="plannum" label="计划数量" width="130"></el-table-column>
<el-table-column prop="actualnum" label="当前数量" width="130"></el-table-column>
<el-table-column prop="date" label="变更时间" width="110"></el-table-column>
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

<!-- <el-form :model="Insertpjgoods" ref="Insertpjgoods" label-width="100px" class="demo-dynamic">
  <el-form-item
    prop="email"
    label="邮箱"
    :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ]"
  >
    <el-input v-model="dynamicValidateForm.email"></el-input>
  </el-form-item>
  <el-form-item
    v-for="(domain, index) in dynamicValidateForm.domains"
    :label="'域名' + index"
    :key="domain.key"
    :prop="'domains.' + index + '.value'"
    :rules="{
      required: true, message: '域名不能为空', trigger: 'blur'
    }"
  >
    <el-input v-model="domain.value"></el-input><el-button @click.prevent="removeDomain(domain)">删除</el-button>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button>
    <el-button @click="addDomain">新增域名</el-button>
    <el-button @click="resetForm('dynamicValidateForm')">重置</el-button>
  </el-form-item>
</el-form> -->

  </el-collapse-item>
   <el-collapse-item title= "任务清单(点击查看)" name="3">
      <el-button
      type="primary"
            icon="el-icon-edit-outline"
             @click="ClickInsert"
          >+添加任务</el-button>

     <el-table :data="Progress"  
    border style="width: 100%">
<el-table-column prop="prname" label="任务名" width="160"></el-table-column>
<el-table-column prop="planstart" label="计划开始时间" width="130"></el-table-column>
<el-table-column prop="planend" label="计划结束时间" width="130"></el-table-column>
<el-table-column prop="actualstart" label="实际开始时间" width="130"></el-table-column>
<el-table-column prop="actualend" label="实际结束时间" width="130"></el-table-column>
<el-table-column prop="plancost" label="计划花费" width="110"></el-table-column>
<el-table-column prop="actualcost" label="当前/实际花费" width="110"></el-table-column>
<el-table-column prop="subcontractcost" label="分包费用" width="110"></el-table-column>
<el-table-column prop="state" label="状态" width="110"></el-table-column>
 <el-table-column label="操作" width="140">
        <template slot-scope="scope">
           <el-button @click="ClickList(scope.row)"
            type="text"
             size="medium"
              icon="el-icon-view">任务详情</el-button>
      
          <el-button
            type="text"
            size="medium"
             @click="ClickList(scope.row)"
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
  </el-collapse-item>  
</el-collapse>

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


<!-- 任务详情 ------------------------------------------------------->
    <el-dialog title="任务详情" :visible.sync="ViewFormVisible" :close-on-click-modal="true">
      <el-form  :inline="true" :model="ViewForm"  class="demo-form-inline" label-width="80px">
        <el-form-item label="入库编号">
          <el-input v-model="ViewForm.id" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="任务名称">
          <el-input v-model="ViewForm.prname" :disabled="true" ></el-input>
        </el-form-item>

             <el-button type="primary" @click="ClickUpdate">修改信息</el-button>
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
      </el-form>

   <el-form :inline="true" :model="ViewForm"  class="demo-form-inline" label-width="80px">
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
          <el-input v-model="ViewForm.state" :disabled="true" ></el-input>
        </el-form-item>

        <el-form-item label="最近更新">
          <el-input v-model="ViewForm.date" :disabled="true" ></el-input>
        </el-form-item>


      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="ViewFormVisible = false ">取 消</el-button>
        <el-button type="primary" @click="HandleUpdate">确 定</el-button>
      </div>
    </el-dialog>


<el-dialog title="添加图片" :visible.sync="ImageFormVisible" :close-on-click-modal="true">
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
    </el-dialog>



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
        <el-button @click="addimageFormVisible = false">取 消</el-button>
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
          listpjGoods
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
            Pjgoods:[],
            Progress:[],
             activeNames: ['1'],
             currentPage:1,
             imageurl:"http://localhost:8083/upload/"+this.$route.query.projectid,
              fileList:[],
              
        dialogImageUrl:'',

             PageInfo:1,
             goodscurrentPage:1,
             UpdateFormVisible:false,
             ViewFormVisible:false,
             InsertFormVisible:false,
             addimageFormVisible:true,
             dialogVisible:false,
             ImageFormVisible:false,
             UpdateForm:{
               id:"",
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
      ClickUpdate(row){
      this.UpdateFormVisible = true;
      
      this.UpdateForm = Object.assign({}, row);
    
      },
      HandleUpdate(){
        
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
      OnRemove(file,fileList){
        this.fileList=fileList
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      Handleupload(file){
          // this.param.append("id",this.UpdateForm.id)    
          this.param.append("file",this.file)  
        uploadimage(this.UpdateForm.id,this.param) 
          .then(res=>{
            console.log(res);
            alert(res);
          })
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      }
  }
}
</script>
