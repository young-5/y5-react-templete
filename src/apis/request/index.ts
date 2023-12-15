/**
 * 封装方法
 */
import { AxiosInstance, AxiosRequestConfig } from 'axios'
import Fetch from './fetch'
class Service {
  private axios: any
  cancelToken: any
  constructor({ fetch }) {
    this.axios = fetch
    this.cancelToken = null
  }
  get<T>(
    url: string,
    params?: any,
    config: AxiosRequestConfig = {},
  ): Promise<T> {
    return this.axios.get(url, {
      params,
      ...config,
    })
  }
  post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<{ data: T }> {
    return this.axios.post(url, data, config)
  }
  put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.axios.put(url, data, config)
  }
  delete<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.axios.delete(url, {
      data,
      ...config,
    })
  }
  all(axiosInstances: AxiosInstance[]) {
    return this.axios.all(axiosInstances)
  }
}
let fetch = new Fetch({})
const service = new Service({ fetch: fetch.axios })

export default service
