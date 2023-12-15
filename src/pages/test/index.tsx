import { cancelToken } from '@/apis/request/fetch'
import { testApi } from '@/apis/test'
import { Button, Tabs } from 'antd'
import * as React from 'react'
import cs from './index.module.less'
const { TabPane } = Tabs
const Test: React.FC = () => {
  const getData = () => {
    testApi().then((res) => {
      console.log(res)
    })
  }
  const cancelFetch = () => {
    cancelToken.removePendingPool({}, '/api/v1/access')
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
