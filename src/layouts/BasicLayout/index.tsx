import * as React from 'react'
import { useState, useContext, useEffect, useRef } from 'react'
import { themeContext } from '@/context'
import { Outlet } from 'react-router-dom'
import { DownOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import {
  Dropdown,
  Space,
  AutoComplete,
  theme as Theme,
  Affix,
  Watermark,
} from 'antd'
import { useNavigate } from 'react-router-dom'
import cs from './index.module.less'
import { useDispatch, useSelector } from 'react-redux'
import { changeUserInfo } from '@/store/module/user'
// import actions from '@/micros/actions'
import { CustomScroll } from '@/components'
import SearchInput from './SearchInput'
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
  const dispatch = useDispatch()

  const userInfo: any = useSelector((state: any) => {
    // console.log(state)
    return {
      ...state.user.userInfo,
    }
  })
  // actions.onGlobalStateChange((state, preState) => {
  //   console.log('子应用监听到', state)
  // })
  useEffect(() => {
    // console.log('userInfo', userInfo)
  }, [userInfo])
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
  const goOut = () => {
    dispatch(changeUserInfo({}))
    navigate('/login')
  }
  const DomRef = useRef()
  const getPanelValue = (searchText: string) =>
    !searchText ? THEME_TYPE : THEME_TYPE
  // : THEME_TYPE?.filter((v) => v.value.includes(searchText))
  return (
    <CustomScroll id='baseCustomScroll'>
      <div className={cs.basic_layout} id='cp'>
        <Affix offsetTop={2}>
          <header className={cs.layout_header}>
            <div
              className={cs.logo_title}
              onClick={() => {
                navigate('/home')
              }}>
              y5-react-templete
            </div>
            <div>
              <SearchInput />
            </div>
            <div className={cs.do_btn}>
              <Dropdown
                menu={{ items, onClick, forceSubMenuRender: true }}
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
                  onSelect={onSelect}
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
          </header>
        </Affix>
        <div style={{ padding: '24px', zIndex: '100' }}>
          <Outlet />
        </div>
      </div>
    </CustomScroll>
  )
}

export default BasicLayout
