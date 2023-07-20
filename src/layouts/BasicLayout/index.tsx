import * as React from 'react'
import { useState, useContext } from 'react'
import { themeContext } from '@/context'
import { Outlet } from 'react-router-dom'
import { DownOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Dropdown, Space, AutoComplete, theme as Theme } from 'antd'
import { useNavigate } from 'react-router-dom'
import cs from './index.module.less'
import { CustomScroll } from '@/components'
const items: MenuProps['items'] = [
  {
    key: '/home',
    label: '首页',
  },
  {
    key: '2',
    label: '测试',
    children: [
      {
        key: '/test',
        label: '逻辑测试',
      },
      {
        key: '/test/ui',
        label: 'UI测试',
      },
    ],
  },
  {
    key: '/login',
    label: '退出',
  },
]

let THEME_TYPE = [
  {
    value: '白天',
  },
  {
    value: '晚上',
  },
  {
    value: '紧凑',
  },
]
const { useToken } = Theme
const BasicLayout: React.FC = () => {
  const { theme, setTheme } = useContext(themeContext)
  const { token } = useToken()
  const navigate = useNavigate()
  const [value, setValue] = useState('')
  const [options, setOptions] = useState<{ value: string }[]>(THEME_TYPE)
  const onClick: MenuProps['onClick'] = ({ key }) => {
    navigate(key)
  }
  const onSelect = (data: string) => {
    setValue(data)
    console.log('token.colorPrimary', token.colorPrimary)
    let TYPE_OBJ = {
      白天: Theme.defaultAlgorithm,
      晚上: Theme.darkAlgorithm,
      紧凑: Theme.compactAlgorithm,
    }
    setTheme({
      algorithm: TYPE_OBJ[data],
      // token: { colorPrimary: 'red' },
      // components:{Radio: {
      //   colorPrimary: '#00b96b',
      // },}
    })
  }
  const getPanelValue = (searchText: string) =>
    !searchText ? THEME_TYPE : THEME_TYPE
  // : THEME_TYPE?.filter((v) => v.value.includes(searchText))
  return (
    <CustomScroll>
      <div className={cs.basic_layout}>
        <header>
          <div
            onClick={() => {
              navigate('/home')
            }}>
            主系统头部
          </div>
          <div className={cs.do_btn}>
            <Dropdown
              menu={{ items, onClick }}
              placement='bottomRight'
              arrow={{ pointAtCenter: true }}>
              <a className={cs.menu} onClick={(e) => e.preventDefault()}>
                <Space>
                  菜单
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
            <div>
              主题：
              <AutoComplete
                options={options}
                style={{ width: 200 }}
                onSelect={onSelect}
                onSearch={(text) => setOptions(getPanelValue(text))}
                placeholder='input here'
              />
            </div>
            <div className={cs.userInfo}>
              <div>用户名称</div>
              <div className={cs.loginOut}>退出</div>
            </div>
          </div>
        </header>
        <div style={{ padding: '24px' }}>
          <Outlet />
        </div>
      </div>
    </CustomScroll>
  )
}

export default BasicLayout
