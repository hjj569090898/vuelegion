<template>
<div>
    <el-divider content-position="left">{{Project.pjname}}</el-divider>

      <el-collapse v-model="activeNames" @change="handleChange">
  <el-collapse-item title= "工程内容(点击查看)" name="1">
  
  </el-collapse-item>
  <el-collapse-item title= "工程统计(点击查看)" name="2">
  </el-collapse-item>
   <el-collapse-item title= "任务清单(点击查看)" name="3">
     <el-table :data="Progress"  

    border style="width: 100%">
<el-table-column prop="prname" label="任务名" width="160"></el-table-column>
<el-table-column prop="planstart" label="计划开始时间" width="130"></el-table-column>
<el-table-column prop="planend" label="计划结束时间" width="130"></el-table-column>
<el-table-column prop="actualstart" label="实际开始时间" width="130"></el-table-column>
<el-table-column prop="actualend" label="实际结束时间" width="130"></el-table-column>
<el-table-column prop="plancost" label="计划花费" width="110"></el-table-column>
<el-table-column prop="actulacost" label="当前/实际花费" width="110"></el-table-column>
<el-table-column prop="subcontractcost" label="分包费用" width="110"></el-table-column>
<el-table-column prop="state" label="状态" width="110"></el-table-column>
 <el-table-column label="操作" width="140">
        <template slot-scope="scope">
           <el-button @click="ClickList(scope.row)"
            type="text"
             size="medium"
              icon="el-icon-view">查看</el-button>
          <el-button
            @click="ClickUpdate(scope.row)"
            type="text"
            size="medium"
            icon="el-icon-edit-outline"
          >更新现状</el-button>
          <el-button
            type="text"
            size="medium"
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

<el-dialog title="修改任务现状" :visible.sync="UpdateFormVisible" :close-on-click-modal="true">
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

    <el-dialog title="任务详情" :visible.sync="ViewFormVisible" :close-on-click-modal="true">
      <el-form :model="UpdateForm" label-width="80px">
        <el-form-item label="入库编号">
          <el-input v-model="UpdateForm.id" :disabled="true"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="ViewFormVisible = false ">取 消</el-button>
        <el-button type="primary" @click="HandleUpdate">确 定</el-button>
      </div>
    </el-dialog>

<el-dialog title="添加图片" :visible.sync="addimageFormVisible" :close-on-click-modal="true">
     <el-upload
      action="http://127.0.0.1:8083/upload/"
      list-type="picture-card"
      :auto-upload="false"
      :on-change="OnChange"
      :on-remove="OnRemove"
      :on-preview="handlePictureCardPreview"
      >
      <i class="el-icon-plus"></i>
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
          uploadimage
    } from "../api/api";
export default {
    data(){
        return {
          
        param: new FormData(),
            projectid:"",
            Project:[],
            Progress:[],
             activeNames: ['1'],
             currentPage:1,
             
              fileList:[],
              
        dialogImageUrl:'',

             PageInfo:1,
             UpdateFormVisible:false,
             ViewFormVisible:false,
             addimageFormVisible:false,
             dialogVisible:false,
             UpdateForm:{
               id:"",
             },
        }
    },
    created() {
    this.getList();
    this.getprogress();
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
         
      },
      ClickUpdate(row){
      this.UpdateFormVisible = true;
      
      this.UpdateForm = Object.assign({}, row);
    
      },
      HandleUpdate(){
        
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
      }
  }
}
</script>
