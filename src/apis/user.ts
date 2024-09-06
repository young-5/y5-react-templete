import fetch from '@/apis/request'
/** 退出 */
export function loginOut(param) {
  return fetch.fetch({
    url: `/koaurl/users/loginOut?id=${param.id}`,
    method: 'get',
    params: param,
  })
}
/**获取用户信息 */
export function queryUserInfo(param) {
  return fetch.fetch({
    url: `/koaurl/users/query${param.id ? `?id=${param.id}` : ''}`,
    method: 'get',
    params: param,
  })
}
