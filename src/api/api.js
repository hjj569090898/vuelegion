import axios from 'axios';

let host ='http://127.0.0.1:8080'

//获取库存信息
// export const getGoods =  (params,params2,params3) =>{return axios.get(`${host}/goods/?page=${params}`+`&type=${params2}`+`&search=${params3}`)};
export const getGoods = params => {return axios.get(`${host}/goods/?page=${params}`)};
//获得库存流水
export const getgoodsflow = params => {return axios.get(`${host}/goodsflow/?page=${params}`)};
//id查询商品
export const goodsbyid = params =>{return axios.get(`${host}/goods/${params}`)}
//商品入库库存
export const GoodsIn = (params,params2) =>{return axios.post(`${host}/goods/${params}`, params2)};
//修改库存信息
export const GoodsModify = params =>{return axios.patch(`${host}/goods/`), params};
//获得商品分类信息
export const GoodsByType = params =>{return axios.get(`${host}/goods/type/${params}`)}
//登录
export const login = params => {
    return axios.post(`${host}/login/`, params)
  }
  //注册
  export const register = params => {
    return axios.post(`${host}/register/`, params)
  }
//获得个人信息
export const getuserInfo = params =>{
  return axios.get(`${host}/userinfo/`, params)
}
//修改个人信息
export const infomodify = params =>{
  return axios.patch(`${host}/updateinfo/`, params)
}
//删除用户
export const DeleteUser = params =>{ return axios.delete(`${host}/deleteuser/`+`${params}/`)}
//申请财务列表
export const Userapplylist = params =>{
  return axios.get(`${host}/userapply/?username=${params}`)
}
export const adduserapply = params =>{
  return axios.post(`${host}/userapply/`,params)
}
//判断用户是否存在
export const username = params =>{
  return axios.get(`${host}/username/?username=${params}`)
}
//根据用户名得到信息
export const getmyuser  = params =>{
  return axios.get(`${host}/userinfobyname/?username=${params}`)
}
//获得用户权限
export const getpermission  = params =>{
  return axios.get(`${host}/userpermission/?username=${params}`)
}

//查看采购信息情况
export const GetStockIn = (params,params2) =>{return axios.get(`${host}/stockin/?state=${params}`+`&page=${params2}`)}
//搜索采购信息
export const SearchStockIn = params =>{return axios.get(`${host}/stockin/${params}`)}
//筛选申请条件的入库信息
export const StateStockIn = params =>{return axios.get(`${host}/stockin/?state=${params}`)}
//创建采购申请
export const StockIn = params => {return axios.post(`${host}/stockin/`, params)}
//修改入库申请信息
export const UpdateStockIn = (params2) =>{return axios.patch(`${host}/stockin/`,params2)}
//删除入库申请信息
export const DeleteStockIn = params =>{ return axios.delete(`${host}/stockin/`+`${params}/`)}


//查看出库(领料)信息
export const GetStockOut = params =>{
  return axios.get(`${host}/stockout/`)
}
//创建领料申请
export const AddStockOut = params => {return axios.post(`${host}/stockout/`), params}

//查看工程
export const ListProject = params => {return axios.get(`${host}/project/?page=${params}`)}
//工程立项
export const AddProject = params =>{return axios.post(`${host}/project/`, params)};

//查询工程
export const QueryProject = params => {return axios.get(`${host}/project/`+`${params}/`)}

//财务信息
export const getFinance =  (params,params2) =>{return axios.get(`${host}/finance/?type=${params}`+`&page=${params2}`)}

export const searchFinance =  (params) =>{return axios.get(`${host}/finance/`+`${params}`)}

//获得所有职员信息分组
export const UserBygroupid = (params,params2) =>{return axios.get(`${host}/getuserbyg?groupid=${params}`+`&page=${params2}`)}

// //获得所有职员信息分组数量
// export const UserBygroupid = (params,params2) =>{return axios.get(`${host}/getuserbyg?groupid=${params}`+`&page=${params2}`)}

//获得所有职员信息
export const getAllUser = params =>{return axios.get(`${host}/getuser/?page=${params}`)}

//获得审核列表
export const getauditing =  (params,params2,params3) =>{return axios.get(`${host}/auditing/?type=${params}`+`&state=${params2}`+`&page=${params3}`)}
//查询审核
export const queryauditing = params =>{return axios.get(`${host}/auditing/`+`${params}`)}
//审核
export const auditi = (params,params2,params3,params4,params5) =>
{return axios.patch(`${host}/auditing/?id=${params}`+`&state=${params2}`+`&admin=${params3}`+`&adate=${params4}`+`&advice=${params5}`)}

//项目
export const  listProgress = (params,params2) =>{return axios.get(`${host}/progress?projectid=${params}`+`&page=${params2}`)}

//图片
export const uploadimage = (params,params2) =>{return axios.post(`${host}/upload/${params}`, params2)}

//项目统计信息
export const projectcount = params =>{return axios.get(`${host}/projectcount/${params}`)}

//图片路径
export const getimageurl = params =>{return axios.get(`${host}/pimage/?projectid=${params}`)}


//修改项目
export const updateproject = (params2) =>{return axios.patch(`${host}/project/`,params2)}
//添加任务
export const AddProgress = params =>{return axios.post(`${host}/progress/`, params)};

//修改任务
export const updateprogress = (params2) =>{return axios.patch(`${host}/progress/`,params2)}

//删除任务
export const DeleteProgress = params =>{return axios.delete(`${host}/progress/${params}`)}

//工程物品清单
export const listpjGoods = (params,params2) =>{return axios.get(`${host}/projectgoods/?projectid=${params}`+`&page=${params2}`)}

//添加物资申请
export const AddProgoods = params =>{return axios.post(`${host}/projectgoods/`, params)};

//出库申请列表
export const listGoodsApply = params =>{return axios.get(`${host}/goodsapply/?page=${params}`)};

//审核出库申请
export const audiGoodsApply  = (params2) =>{return axios.patch(`${host}/goodsapply/`,params2)}

//继续添加申请
export const addprojectgoods = params =>{return axios.patch(`${host}/addprojectgoods/`, params)};

//退回物资
export const deleteprojectgoods   =  (params,params2,params3) =>{return axios.patch(`${host}/deleteprojectgoods/?deletenum=${params}`+`&admin=${params2}`,params3)}

//权限修改
export const addpermission = (params,params2) =>{return axios.post(`${host}/addpermission/${params}?permissions=${params2}`)};