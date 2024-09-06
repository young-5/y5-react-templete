import { themeContext } from '@/context'
import store from '@/store/index'
import { ConfigProvider, Watermark } from 'antd'
import 'antd/dist/reset.css'
import zhCN from 'antd/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import { Fragment, Suspense, useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import './App.css'
import Routes from './Routes'
dayjs.locale('zh-cn')
function App({ micro }: { micro: any }) {
  const [theme, setTheme] = useState({
    token: { colorPrimary: '#00b96b' },
  })
  const getUserInfo = () => {
    console.log('microtoken', micro?.token)
    micro.token && localStorage.setItem('token', micro?.token)
  }
  useEffect(() => {
    getUserInfo()
  }, [])
  return (
    <Watermark content={`${micro.source}`}>
      <themeContext.Provider value={{ theme, setTheme }}>
        <ConfigProvider
          theme={{
            ...theme,
          }}
          locale={zhCN}>
          <div className='App'>
            <Suspense fallback={<div>路由加载中...</div>}>
              <Fragment>
                <Provider store={store}>
                  <Routes />
                </Provider>
              </Fragment>
            </Suspense>
          </div>
        </ConfigProvider>
      </themeContext.Provider>
    </Watermark>
  )
}

export default App
