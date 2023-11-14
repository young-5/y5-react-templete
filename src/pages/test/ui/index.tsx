import { CustomScroll, VirtualizedList } from '@/components'
import { Tabs } from 'antd'
import * as React from 'react'
import { useEffect, useRef, useState } from 'react'
import CssCP from './CssCP'
import ImgTs from './ImgTs'
import cs from './index.module.less'
const { TabPane } = Tabs
const Test: React.FC = () => {
  const imgBoxRef = useRef<any>([])
  const [updataData, setUpadtaData] = useState(false)
  useEffect(() => {
    console.log('imgBoxRef', imgBoxRef.current)
  }, [imgBoxRef.current])
  const [activeTab, setActiveTab] = useState('1')
  let data = new Array(1000).fill({})?.map((v: any, index: number) => ({
    name: `-----------------${index}`,
    id: index,
  }))
  const onUpdata = () => {
    setUpadtaData((v) => !v)
  }
  const columns = React.useCallback(() => {
    return [
      {
        title: '角色名称',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
      },
    ]
  }, [])
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

        <TabPane tab={'虚拟列表'} key={'5'}>
          <VirtualizedList list={data} />
        </TabPane>

        <TabPane tab={'图片相关组件'} key={'7'}>
          <ImgTs />
        </TabPane>

        <TabPane tab={'css 知识实践'} key={'8'}>
          <CssCP />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default Test
