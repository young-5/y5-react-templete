/**
 * 请求基础配置
 */

import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    InternalAxiosRequestConfig,
} from 'axios'
import CancelToken from './CancelToken'
import { isLogin, verifyAuthority } from './tools'
export type ReqFulfilled = (
  config: InternalAxiosRequestConfig,
) => InternalAxiosRequestConfig
export type ResFulfilled = (response: AxiosResponse) => AxiosResponse['data']
export type ResRejected = (config: AxiosError<{ message: string }>) => void
const BASE_URL = ''
const defaultConfig: AxiosRequestConfig = {
  baseURL: BASE_URL,
  timeout: 600 * 1000,
  withCredentials: true,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
}
export const cancelToken: any = new CancelToken()

const defaultReqFulfilled: ReqFulfilled = (config) => {
  // 权限校验 + 数据处理
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
}
const defaultResFulfilled: ResFulfilled = (response) => {
  console.log(cancelToken)
  cancelToken?.removePendingPool(response.config)
  if (response.status == 200) {
    // 异常处理
    const { code } = response?.data
    if (code !== 0) {
      // 后端沟通状态码
    } else {
      // 数据处理
      return response.data
    }
  } else {
    throw new Error('错误')
  }
}
const defaultResRejected: ResRejected = (error) => {
  console.log(error)
}
class Fetch {
  axios: AxiosInstance
  constructor({
    config = {},
    onReqFulfilled = defaultReqFulfilled,
    onResFulfilled = defaultResFulfilled,
    onResRejected = defaultResRejected,
  }) {
    this.axios = axios.create(Object.assign({ ...defaultConfig }, config))
    this.axios.interceptors.request.use(onReqFulfilled)
    this.axios.interceptors.response.use(onResFulfilled, onResRejected)
  }
}

export default Fetch
