// 请求封装
import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios'
import qs from 'qs'
import { message } from 'antd'
import { IData } from '@/interface/types'
import NProgress from 'nprogress';
const pendingRequest = new Map();

function generateReqKey(config: AxiosRequestConfig) {
  const { method, url, params, data } = config;
  return [method, url, qs.stringify(params), qs.stringify(data)].join('&')
}

function addPendingRequest(config: AxiosRequestConfig) {
  const requestKey = generateReqKey(config);
  config.cancelToken = config.cancelToken || new axios.CancelToken((cancel) => {
    if (!pendingRequest.has(requestKey)) {
      pendingRequest.set(requestKey, cancel)
    }
  });
}

function removePendingRequest(config: AxiosRequestConfig) {
  const requestKey = generateReqKey(config);
  if (pendingRequest.has(requestKey)) {
    const cancelToken = pendingRequest.get(requestKey);
    cancelToken(requestKey);
    pendingRequest.delete(requestKey);
  }
}
// 自定义判断元素类型JS
let checkType = function (obj: any) {
  return Object.prototype.toString.call(obj).toLowerCase()
}
// 参数过滤函数
let filterNull = (o: any) => {
  Object.keys(o).map(key => {
    if (o[key] === null) {
      delete o[key]
    }
    if (checkType(o[key]) === '[object string]') {
      o[key] = o[key].trim()
    } else if (checkType(o[key]) === '[object object]') {
      o[key] = filterNull(o[key])
    } else if (checkType(o[key]) === '[object array]') {
      o[key] = filterNull(o[key])
    }
  })
  return o
}

// 请求超时时间
axios.defaults.timeout = 30000;
// 环境地址
axios.defaults.baseURL = import.meta.env.VITE_APP_BASEURL || '';

axios.defaults.withCredentials = false

axios.defaults.headers.post['Content-Type'] = 'application/json';

// 请求拦截器
axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    removePendingRequest(config); // 检查是否存在重复请求
    addPendingRequest(config); // 将当前请求信息添加到 pendingRequest对象中
    config.headers = {
      "Content-Type": "application/json",
    };
    config.data = JSON.stringify(config.data);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
axios.interceptors.response.use((response) => {
  console.log(response)
  removePendingRequest(response.config); // 从 pendingRequest对象中移除请求
  const status = response.status
  let msg = ''
  if (status < 200 || status >= 300) {
    // 处理http错误，抛到业务代码
    msg = showStatus(status)
    if (typeof response.data === 'string') {
      response.data = { msg }
    } else {
      response.data.msg = msg
    }
  }
  return response
}, (error) => {
  removePendingRequest(error.config || {}); // 从 pendingRequest对象中移除请求
  if (axios.isCancel(error)) {
    console.log('repeated request: ' + error.message)
  } else {
    // 错误抛到业务代码
    error.data = {}
    error.data.msg = '请求超时或服务器异常，请检查网络或联系管理员！'
    message.error(error.data.msg)
  }
  return Promise.reject(error)
})

// 提示信息
const showStatus = (status: number) => {
  let message = ''
  switch (status) {
    case 400:
      message = '请求错误(400)'
      break
    case 401:
      message = '未授权，请重新登录(401)'
      break
    case 403:
      message = '拒绝访问(403)'
      break
    case 404:
      message = '请求出错(404)'
      break
    case 408:
      message = '请求超时(408)'
      break
    case 500:
      message = '服务器错误(500)'
      break
    case 501:
      message = '服务未实现(501)'
      break
    case 502:
      message = '网络错误(502)'
      break
    case 503:
      message = '服务不可用(503)'
      break
    case 504:
      message = '网络超时(504)'
      break
    case 505:
      message = 'HTTP版本不受支持(505)'
      break
    default:
      message = `连接出错(${status})!`
  }
  return `${message}，请检查网络或联系管理员！`
}

// 请求方法封装
/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url: string, params: IData): Promise<any> {
  return new Promise((resolve, reject) => {
    NProgress.start()
    axios.get(url, {
      params: filterNull(params)
    })
      .then(response => {
        if (response.status === 200) {
          NProgress.done()
          resolve(response.data)
        } else {
          reject(response)
        }
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * 封装get方法
 * @param url
 * @single data
 * @returns {Promise}
 */

export function singlefetch(url: string, params: IData): Promise<any> {
  return new Promise((resolve, reject) => {
    NProgress.start()
    axios.get(url + '/' + filterNull(params))
      .then(response => {
        if (response && response.data.code === 200) {
          resolve(response.data)
          NProgress.done()
        } else {
          reject(response)
        }
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
export function post(url: string, params: IData): Promise<any> {
  return new Promise((resolve, reject) => {
    NProgress.start()
    axios.post(url, filterNull(params))
      .then(response => {
        if (response && [200, 2000].includes(response.data.code)) {
          resolve(response.data)
          NProgress.done()
        } else {
          reject(response)
        }
      })
      .catch(err => {
        reject(err)
      })
  })
}