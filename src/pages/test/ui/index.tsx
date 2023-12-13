import { CustomScroll } from '@/components'
import { Tabs } from 'antd'
import * as React from 'react'
import { useState } from 'react'
import CssCP from './CssCP'
import cs from './index.module.less'
const { TabPane } = Tabs
const Test: React.FC = () => {
  const [activeTab, setActiveTab] = useState('1')

  return (
    <div className={cs.test}>
      <div className={cs.test_title}>ui测试</div>
      <Tabs
        activeKey={activeTab}
        destroyInactiveTabPane
        onChange={(v: any) => {
          setActiveTab(v)
        }}>
        <TabPane tab={'自定义滚动条'} key={'1'}>
          <CustomScroll>
            <div
              style={{
                height: '500px',
              }}>
              <div>顶部</div>
              <div
                style={{
                  background: '#eee',
                  height: '1000px',
                }}></div>
              <div>底部</div>
            </div>
          </CustomScroll>
        </TabPane>

        <TabPane tab={'css 知识实践'} key={'8'}>
          <CssCP />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default Test
