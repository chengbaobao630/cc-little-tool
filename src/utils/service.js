import axios from 'axios'
import {PYTHON_PATH} from '../../config/dev.env'

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

const service = axios.create({
  timeout: 5000,
  withCredentials: true,
  baseURL: PYTHON_PATH
})

// request拦截器
service.interceptors.request.use(
  config => {
    // 发送请求之前，要做的业务
    return config
  },
  error => {
    // 错误处理代码

    return Promise.reject(error)
  }
)

// response拦截器
service.interceptors.response.use(
  response => {
    if (response.data.code === 199999) {
      // location.reload()
      return false
    }
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
