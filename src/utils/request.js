/* jshint esversion: 6 */
import axios from 'axios';
import {
  Message,
  MessageBox
} from 'element-ui'

let apiUrl = "",
    maxServerTime = 35000;
// if (PRODUCTION) {
//   apiUrl = "/fyview/api/dataService/"; //内网正式
// } else if (DEVELEPMENT) {
//   apiUrl = "/api/"; //测试
// }

window.addEventListener("offline", function (e) {
  Message.error({
    message: '网络链接已断开!'
  });
})

window.addEventListener("online", function (e) {
  Message.success({
    message: '网络链接已链接!'
  });
})

export const baseURL = apiUrl;

import qs from "qs"

axios.defaults.timeout = maxServerTime;//超时时间
axios.defaults.baseURL = baseURL;

//请求头设置
axios.interceptors.request.use((config) => {
  config.data = qs.stringify(config.data);
  config.headers = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  }
  return config;
}, (error) => {
  Message.error({message: '请求超时!请检查网络链接'});
  return Promise.reject(error);
});


//返回参数拦截器
axios.interceptors.response.use((response) => {
    if (response.data.code == '0') { //成功，状态码根据接口文档设置
      return response;
    } else {
      MessageBox.confirm(
        response.data.msg,
        '提示信息', {
          confirmButtonText: '确定',
          showCancelButton: false,
          type: 'warning'
        });
    }

  },
  err => {
    if (err.response.status == 504 || err.response.status == 404) {
      Message.error({
        message: '服务器被吃了⊙﹏⊙∥'
      });
    } else if (err.response.status == 403) {
      Message.error({
        message: '权限不足,请联系管理员!'
      });
    } else if (err.response.status == 401) {
      Message.error({
        message: err.response.data.msg
      });
    } else {
      if (err.response.data.msg) {
        Message.error({
          message: err.response.data.msg
        });
      } else {
        Message.error({
          message: '未知错误!'
        });
      }
    }
    // return Promise.resolve(err);
  }
)

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url, params) {

  return new Promise((resolve, reject) => {
    axios.get(url, {
        params: params
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err)
      })
  })

}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err)
      })
  })

}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err)
      })
  })
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data)
      .then(response => {
        resolve(response.data);
      }, err => {
        reject(err)
      })
  })
}
