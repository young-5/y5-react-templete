import * as React from 'react'
import {
  Routes,
  Route,
  BrowserRouter as Router,
  Navigate,
} from 'react-router-dom'
import routesConfig from './router'
import AuthRouter from './router/AuthRouter'
import Home from '@/pages/home'
import Docs from '@/pages/docs'
// import { useStore } from '@/models'
// import { observer } from 'mobx-react-lite'
import { Loading } from '@/components'
const Page404 = React.lazy(() => import('./pages/404'))
//react-router-dom 版本不同 配置属性有差异
const renderRoutes = (routesList: any, menu?: any, props?: any): any => {
  let _routesList: any[] = []
  routesList.forEach((route: any, i: number) => {
    let isMeau = route.meau
    if (!isMeau) {
      _routesList.push(
        <Route
          key={route.key || route.path}
          path={route.path}
          element={route.component}>
          {!!route.children && renderRoutes(route?.children)}
        </Route>,
      )
    } else {
      _routesList.push(
        <Route
          key={route.key || route.path}
          path={route.path}
          element={
            // route.component
            <AuthRouter route={route.path}>{route?.component}</AuthRouter>
          }>
          {!!route.children && renderRoutes(route?.children)}
        </Route>,
      )
    }
  })
  return _routesList
}

const Routers = (props: any) => {
  let store: any = {} // useStore()
  const user = store.user || {}
  const sysConfig = store.sys_config || {}
  const goInitApi = () => {
    if (localStorage.getItem('token') && !user.userId) {
      user?.query?.({})
      sysConfig?.querySysFileds?.()
    }
  }
  React.useEffect(() => {
    goInitApi()
  }, [user])
  return (
    <Router
      basename={
        (window as any).__POWERED_BY_QIANKUN__ ? '/react-templete' : ''
      }>
      <React.Suspense fallback={<Loading />}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/docs' element={<Docs />} />
          {/* <Route path='/home' element={<div>子应用</div>} /> */}
          {/* {renderRoutes(routesConfig, user?.UserInfo?.menu, props)} */}
          {/* <Route path='/api/v1/download' element={<div>下载</div>} />
          <Route path='/404' element={<Page404 />} />
          <Route path='*' element={<Page404 />} /> */}
        </Routes>
      </React.Suspense>
    </Router>
  )
}

export default React.memo(Routers) //observer(Routers)
