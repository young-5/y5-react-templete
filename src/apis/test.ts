import service from './request'

export function testApi() {
  return service.get('/api/v1/access', {
    addPendingPool: { hashUrl: '/api/v1/access' },
  })
}
