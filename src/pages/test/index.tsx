import * as React from 'react'
import { Button, Tabs } from 'antd'
import fetch from '@/apis/request'
import cs from './index.module.less'
const { TabPane } = Tabs
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
      <div className={cs.test_title}>逻辑方法</div>
      <Tabs>
        <TabPane tab={'请求发送与取消：'} key={1}>
          <div className={cs.test_fetch}>
            <Button onClick={getData}>请求触发</Button>
            <Button onClick={cancelFetch}>请求取消</Button>
          </div>
          <div>F12 控制台 network查看效果吧。。。</div>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default Test
