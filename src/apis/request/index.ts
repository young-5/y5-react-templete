import axios from 'axios'
import { verifyAuthority, isLogin } from './tools'
import CancelToken from './CancelToken'
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
      const { code } = response?.data
      if (code !== 0) {
        // 后端沟通状态码
      } else {
        // 数据处理
        return response
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
