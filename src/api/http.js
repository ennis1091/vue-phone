import axios from 'axios'
import router from '@/router'

// axios 配置
axios.defaults.timeout = 8000
axios.defaults.baseURL =
  'https://easy-mock.com/mock/5cdcc45ede625c6ccadfd711/example/'

// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (localStorage.token) {
      //判断token是否存在
      config.headers.Authorization = localStorage.token //将token设置成请求头
    } //else {
    //   config.headers.Authorization = '7852395023859302850324' //测试设置假请求头
    // }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// http response 拦截器
axios.interceptors.response.use(
  response => {
    if (response.data.errno === 999) {
      router.replace('/')
      console.log('token过期')
    }
    return response
  },
  error => {
    return Promise.reject(error)
  }
)
export default axios
