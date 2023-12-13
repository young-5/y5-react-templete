import { themeContext } from '@/context'
import { changeUserInfo } from '@/store/module/user'
import { DownOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { AutoComplete, Dropdown, Space, theme as Theme } from 'antd'
import * as React from 'react'
import { useContext, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import cs from './index.module.less'

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
        key: '/test/test',
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
const BasicHeader: React.FC = () => {
  const navigate = useNavigate()
  const { token } = useToken()
  const dispatch = useDispatch()
  const { theme, setTheme } = useContext(themeContext)
  const [options, setOptions] = useState<{ value: string }[]>(THEME_TYPE)
  const userInfo: any = useSelector((state: any) => {
    return {
      ...state.user.userInfo,
    }
  })

  const onNavigate: MenuProps['onClick'] = ({ key }) => {
    navigate(key)
  }
  const onThemeSelect = (data: string) => {
    setTheme(data)
    console.log('token.colorPrimary', token.colorPrimary)
    let TYPE_OBJ = {
      白天: Theme.defaultAlgorithm,
      晚上: Theme.darkAlgorithm,
      紧凑: Theme.compactAlgorithm,
    }
    setTheme({
      algorithm: TYPE_OBJ[data],
    })
  }
  const goOut = () => {
    dispatch(changeUserInfo({}))
    navigate('/login')
  }
  const DomRef = useRef()
  const getPanelValue = (searchText: string) =>
    !searchText ? THEME_TYPE : THEME_TYPE

  return (
    <div className={cs.layout_header}>
      <div
        className={cs.logo_title}
        onClick={() => {
          navigate('/home')
        }}>
        Young5百宝箱
      </div>
      <div className={cs.do_btn}>
        <Dropdown
          menu={{ items, onClick: onNavigate, forceSubMenuRender: true }}
          // trigger={['click']}
          getPopupContainer={(e) =>
            e.parentElement || DomRef.current || document.body
          }
          placement='bottomRight'
          arrow={{ pointAtCenter: true }}>
          <a
            ref={DomRef}
            className={cs.menu}
            onClick={(e) => e.preventDefault()}>
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
            onSelect={onThemeSelect}
            onSearch={(text) => setOptions(getPanelValue(text))}
            placeholder='input here'
          />
        </div>
        <div className={cs.userInfo}>
          {userInfo?.id ? (
            <>
              <div>{userInfo?.name}</div>
              <div className={cs.loginOut} onClick={goOut}>
                退出
              </div>
            </>
          ) : (
            <div
              className={cs.login}
              onClick={() => {
                navigate('/login')
              }}>
              登录
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BasicHeader
