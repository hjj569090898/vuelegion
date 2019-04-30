<template>
    <div>
        
<el-input
      :placeholder="tip"
      v-model="Search.id"
      style="width: 280px;"
      class="filter-item"
      prefix-icon="el-icon-search"
      @keyup.enter.native="HandleSearch(Search.id,value1)"
    />
    <font class="el-class">请选择申请种类</font>
 <el-select v-model="value1" placeholder="全部" style="width: 200px" @change="HandleSearch(Search.id,value1)">
      <el-option v-for="item in Selects" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>

<el-button type="success" round @click="HandleSearch(Search.id,value1)">查询</el-button>
    </div>
</template>
<script>
export default {
    data(){
        return {
            tip:"请输入申请号/申请人",
            Search:{
                id:"",
            },
            Selects:[{
          value: "",
          label: "全部"
        },
        {
          value: "仓储",
          label: "仓储申用"
        },
        {
          value: "项目",
          label: "项目申用"
        },
        { value: "个人", label: "个人申用" }],
        }
    }
}
</script>
