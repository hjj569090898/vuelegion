import axios from 'axios';

let host ='http://127.0.0.1:8083'

//获取库存信息
// export const getGoods =  (params,params2,params3) =>{return axios.get(`${host}/goods/?page=${params}`+`&type=${params2}`+`&search=${params3}`)};
export const getGoods = params => {return axios.get(`${host}/goods/`,params)};
//商品入库库存
export const GoodsIn = params =>{return axios.post(`${host}/goods/`), params};
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

//判断用户是否存在
export const username = params =>{
  return axios.get(`${host}/username/?username=${params}`)
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
export const AddProject = params =>{return axios.post(`${host}/project/`), params};

//查询工程
export const QueryProject = params => {return axios.get(`${host}/project`+`${params}/`)}

//财务信息
export const getFinance =  (params,params2) =>{return axios.get(`${host}/finance/?type=${params}`+`&page=${params2}`)}

export const searchFinance =  (params) =>{return axios.get(`${host}/finance/`+`${params}`)}

//获得所有职员信息分组
export const UserBygroupid = (params,params2) =>{return axios.get(`${host}/getuserbyg/?groupid=${params}`+`&page=${params2}`)}

//获得所有职员信息
export const getAllUser = params =>{return axios.get(`${host}/getuser/?page=${params}`)}

//获得审核列表
export const getauditing =  (params,params2,params3) =>{return axios.get(`${host}/auditing/?type=${params}`+`&state=${params2}`+`&page=${params3}`)}
//查询审核
export const queryauditing = params =>{return axios.get(`${host}/auditing/`+`${params}`)}