import { themeContext } from '@/providers'
import store from '@/store/index'
import { ConfigProvider, Watermark } from 'antd'
import 'antd/dist/reset.css'
import zhCN from 'antd/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import { Fragment, Suspense, useState } from 'react'
import { Provider } from 'react-redux'
import Routes from './Routes'
dayjs.locale('zh-cn')
function App() {
  const [theme, setTheme] = useState({
    token: { colorPrimary: '#00b96b' },
  })
  return (
    <Watermark content='Young5百宝箱'>
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
