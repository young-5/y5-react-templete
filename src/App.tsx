import { Suspense, Fragment, createContext, useState } from 'react'
import { ConfigProvider, Watermark } from 'antd'
import { themeContext } from '@/context'
import Routes from './Routes'
import 'dayjs/locale/zh-cn'
import dayjs from 'dayjs'
import zhCN from 'antd/locale/zh_CN'
import { Provider } from 'react-redux'
import store from '@/store/index'
import 'antd/dist/reset.css'
import './App.css'
dayjs.locale('zh-cn')
function App() {
  const [theme, setTheme] = useState({
    token: { colorPrimary: '#00b96b' },
  })
  return (
    <Watermark content='y5-react-templete'>
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
