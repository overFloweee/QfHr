import axios from 'axios'
import {error} from "autoprefixer/lib/utils";
import store from "@/store";
import Message from "element-ui/packages/message";
import da from "element-ui/src/locale/lang/da";

const service = axios.create({
  baseURL: '/api',
  timeout: 10000
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 成功执行第一个
    // 取到token,如果存在就 在请求头中注入 token
    let token = store.getters.token;
    if (token) {
      config.headers.authorization = 'Bearer' + token

    }

    return config
  },
  (error) => {
    // 失败执行第二个
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    // 成功执行第一个
    const {data, message, success} = response.data
    if (success) {
      return data
    } else {
      Message({type: 'error', message})
      return Promise.reject(new Error(message))
    }
  },
  (error) => {
    // 失败执行第二个
    Message({type: 'error', message: error.message})
    return Promise.reject(error)

  }
)

// 响应拦截器

export default service
