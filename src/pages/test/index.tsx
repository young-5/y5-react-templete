import { cancelToken } from '@/apis/request/fetch'
import { testApi, testrrorApi } from '@/apis/test'
import useApiPoll from '@/hooks/useApiPoll'
import { Button, Tabs } from 'antd'
import * as React from 'react'
import cs from './index.module.less'
const { TabPane } = Tabs
const Test: React.FC = () => {
  const [apiFun] = useApiPoll(testrrorApi, {}, 5000)
  const getData = () => {
    testApi().then((res) => {
      console.log(res)
    })
  }
  const cancelFetch = () => {
    cancelToken.removePendingPool({}, '/api/v1/access')
  }
  const rootAddLister = () => {
    const rootElement = document.getElementById('ui1')
    const click = () => {
      console.log('root click')
    }
    rootElement.addEventListener('click', click)
  }
  React.useEffect(() => {
    rootAddLister()
  }, [])
  const stopClik = (e) => {
    console.log('哈哈')
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
  }
  return (
    <div className={cs.test} id='ui1'>
      <div className={cs.test_title}>逻辑方法</div>
      <Tabs>
        <TabPane tab={'请求发送与取消：'} key={1}>
          <div className={cs.test_fetch}>
            <Button onClick={getData}>请求触发</Button>
            <Button onClick={cancelFetch}>请求取消</Button>
            <Button onClick={apiFun}>轮询</Button>
            <Button onClick={stopClik}>阻止冒泡</Button>
          </div>
          <div>F12 控制台 network查看效果吧。。。</div>
        </TabPane>
      </Tabs>
    </div>
  )
}

export default Test
