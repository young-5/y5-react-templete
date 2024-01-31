import Mock from 'mockjs'

// 拦截请求，模拟接口url和数据
Mock.Mock('/api/list', 'get', {
  message: 'success',
  code: 200,
  data: {
    name: 'xxx',
  },
})

//带参数
/* 
post参数，option前端请求的数据，option.url请求的地址
option.type 请求的方式
option.body请求的字符参数（需要JSON.parse转对象）
*/
Mock.Mock('/api/list2/', 'post', function (option) {
  return {
    code: 0,
    msg: '参数成功',
    data: {
      title: '信息标题',
      content: '内容',
      ...JSON.parse(option.body),
    },
  }
})
