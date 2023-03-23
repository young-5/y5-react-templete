import * as React from 'react'
import { useRef, useEffect, useState } from 'react'
import { Tabs } from 'antd'
import cs from './index.module.less'
import { CustomScroll, Table, VirtualizedList } from '@/components'
import ImgTs from './ImgTs'
import cl from 'classnames'
const { TabPane } = Tabs
const Test: React.FC = () => {
  const imgBoxRef = useRef<any>([])
  useEffect(() => {
    console.log('imgBoxRef', imgBoxRef.current)
  }, [imgBoxRef.current])
  const [activeTab, setActiveTab] = useState('1')
  let data = new Array(1000).fill({})?.map((v: any, index: number) => ({
    name: `-----------------${index}`,
    id: index,
  }))

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
        <TabPane tab={'表格'} key={'2'}>
          <Table
            columns={() => {
              return [
                {
                  title: '角色名称',
                  dataIndex: 'name',
                  key: 'name',
                  render: (text) => <a>{text}</a>,
                },
              ]
            }}
            rowKey={(v: any) => v.id}
            searchPrams={{}}
            fetchApi={async () => {
              return {
                data: [
                  {
                    id: '111',
                    name: '1',
                  },
                  {
                    id: '2111',
                    name: '2',
                  },
                ],
                total: 2,
              }
            }}
          />
        </TabPane>

        <TabPane tab={'虚拟列表'} key={'5'}>
          <VirtualizedList list={data} />
        </TabPane>

        <TabPane tab={'图片相关组件'} key={'7'}>
          <ImgTs />
        </TabPane>
      </Tabs>
    </div>
  )
}

export default Test
