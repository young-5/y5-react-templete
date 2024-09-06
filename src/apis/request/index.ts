import { message } from 'antd'
import axios from 'axios'
import CancelToken from './CancelToken'
import { isLogin, verifyAuthority } from './tools'
const cancelToken: any = new CancelToken()
const BASE_URL = ''
const fetch = axios.create({
  baseURL: BASE_URL,
})

fetch.interceptors.request.use(
  (config) => {
    // 权限校验
    // 数据处理
    verifyAuthority()
    isLogin()
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token
    }
    if (config?.params?.addPendingPool) {
      console.log(cancelToken)
      let hashUrl = cancelToken?.addPendingPool(
        config,
        config?.params?.addPendingPool?.hashUrl,
      )
      console.log('hashUrl:', hashUrl)
      delete config?.params?.addPendingPool
    }
    return config
  },
  (error) => {
    console.error(error)
    return error
  },
)

fetch.interceptors.response.use(
  (response: any) => {
    console.log(cancelToken)
    cancelToken?.removePendingPool(response.config)
    if (response.status == 200) {
      // 异常处理
      const { code, data, msg } = response?.data || {}
      if ([0, 200].includes(code)) {
        // 数据处理
        return data
      } else {
        // 后端沟通状态码
        message.error(msg)
      }
    } else {
    }
  },
  (error) => {
    console.error('error：', error)
    const errCode = error?.response?.status
    // http 异常处理
    switch (errCode) {
      case 401:
        break
      case 403:
        break
    }
  },
)

export default {
  fetch,
  cancelToken,
}
