/**
 * 请求模块
 */
import axios from 'axios'
import store from '@/store/index.js'
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net' // 接口的基准路径
})

// 请求拦截器
request.interceptors.request.use(function (config) {
  // 请求发起会经过这里
  // config是本次请求的配置对象
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  // 必须返回config对象，否则请求没发出去
  return config
}, function (error) {
  // 请求出错会经过这里
  return Promise.reject(error)
})
// 响应拦截器

export default request
