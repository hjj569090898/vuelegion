import axios from 'axios'
import qs from 'qs'

let baseurl = 'http://localhost:8080/'
function getRequest (apiPath, params, successCallback, errorCallback) {
  let url = baseurl + apiPath
 let req = axios.get(url, {
    params: params,
    paramsSerializer: params => {
      return qs.stringify(params, { indices: false })
    }})
  thenResponse(req, successCallback, errorCallback)
}
function postRequest (apiPath, params, successCallback, errorCallback) {
  let url = baseurl + apiPath
  let req = axios.post(url, qs.stringify(params, { indices: false }))
  thenResponse(req, successCallback, errorCallback)
}

function putRequest (apiPath, params, successCallback, errorCallback) {
  let url = baseurl + apiPath
  // var params = new URLSearchParams()
  // params.append('status', 0)
  let req = axios.put(url, qs.stringify(params, { indices: false }))
  thenResponse(req, successCallback, errorCallback)
}

function deleteRequest (apiPath, params, successCallback, errorCallback) {
  let url = baseurl + apiPath
  let req = axios.delete(url, {
    params: params,
    paramsSerializer: params => {
      return qs.stringify(params, { indices: false })
    }})
  thenResponse(req, successCallback, errorCallback)
}

/**
 * 请求结果处理
 * @param axiosRequest
 * @param successCallback
 * @param errorCallback
 */
function thenResponse (axiosRequest, successCallback, errorCallback) {
  axiosRequest.then((res) => {
    if (res.status === 200) {
      res = res.data
      if (res.code === 0) {
        if (successCallback) successCallback(res)
      } else {
        if (errorCallback) errorCallback(res.code, res.msg)
      }
    }
  }).catch((error) => {
    if (errorCallback) errorCallback(-1, error.message)
  })
}
export { getRequest, postRequest, putRequest, deleteRequest }