import service from './request';

export function loginApi(data: { userId: string; name: string }) {
  return service.post('/api/v1/users/login', data)
}
