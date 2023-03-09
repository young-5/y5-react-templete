import * as React from 'react'
import fetch from '@/apis/request'
import cs from './index.module.less'
const Test: React.FC = () => {
  const getData = () => {
    fetch
      .fetch({
        url: '/api/v1/string',
        method: 'get',
        params: {
          addPendingPool: {},
        },
      })
      .then((res) => {
        console.log(res)
      })
  }
  const cancelFetch = () => {
    fetch.cancelToken.removePendingPool({}, 'get$$/api/v1/string')
  }
  return (
    <div className={cs.test}>
      <div className={cs.test_title}>测试</div>
      <div>请求发送与取消：</div>
      <button onClick={getData}>请求触发</button>
      <button onClick={cancelFetch}>请求取消</button>
    </div>
  )
}

export default Test
