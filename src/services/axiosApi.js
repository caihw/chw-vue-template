/**
 * axios Api封装，接口属于mock，可以修改
 * author：caihognwen
 */
/* eslint-disable */
import request  from "axios"
//请求拦截器配置
request.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

// 返回拦截器配置
request.interceptors.response.use(response => {
  if(response.data && response.data.data && response.data.data.total) {
    response.data.data.total = Number(response.data.data.total);
  }
  return response
}, error => {
  return Promise.resolve(error.response)
})

// http请求
const httpServer = (opts, data) => {
  let HYtimestamp = (new Date()).getTime();
  let Public = { //公共参数
    "HYtimestamp": HYtimestamp
  }
  let httpData = null;
  if(opts.contentType === "multipart/form-data") {
    if (data instanceof FormData) {
      httpData = data
    } else {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
      httpData = formData
    }
  } else {
    httpData = Object.assign(Public, data);
  }
  let httpDefaultOpts = { //http默认配置
    method: opts.method || "",
    baseURL: process.env.VUE_APP_BASE_URL, // 接口公共部分
    responseType: opts.responseType ? opts.responseType : "",
    url: opts.url,
    timeout: opts.timeout ? opts.timeout : opts.timeout === 0 ? 0 : 60000,
    params: httpData,
    data: httpData,
    headers: opts.method.toLowerCase() == "get" ? { //配置请求头数据
      "X-Requested-With": "XMLHttpRequest",
      "Accept": "application/json, text/plain, */*, application/octet-stream",
      "Content-Type": opts.contentType || "application/json; charset=UTF-8",
    } : {
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": opts.contentType || "application/json",
    },
  }

  if(opts.method.toLowerCase() == "get" || opts.method.toLowerCase() == "delete") {
    delete httpDefaultOpts.data
  } else {
    httpDefaultOpts.url = httpDefaultOpts.url
    if(opts.contentType && opts.contentType !== "application/x-www-form-urlencoded; charset=UTF-8" && opts.contentType !== "multipart/form-data") { // 判断post请求条件下是否有特殊设置
      delete httpDefaultOpts.data
    } else {
      if (opts.paramsIsAry && opts.method.toLowerCase() === "post") {
        delete httpDefaultOpts.data
      } else {
        delete httpDefaultOpts.params
      }
    }
  }
  let promise = new Promise((resolve, reject) => {
    request (httpDefaultOpts).then(res => {
      resolve(res)
    }).catch(response => {
      reject(response)
    })
  })
  return promise
}

export default httpServer
