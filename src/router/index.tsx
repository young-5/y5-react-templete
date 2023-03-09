// 路由注册配置
import * as React from 'react'
import { Loading } from '@/components'

interface IRoute {
  path: string
  component: any
  redirect?: any
  children?: any[]
  [name: string]: any
}

// 布局
const BasicLayout = React.lazy(() => import('../layouts/BasicLayout'))
const UserLayout = React.lazy(() => import('../layouts/UserLayout'))
const Page404 = React.lazy(() => import('../pages/404'))
const Outletc = React.lazy(() => import('../pages/Outletc'))

// 登录注册
const Login = React.lazy(() => import('../pages/user/login'))

// 后台菜单
const Home: React.FC | any = React.lazy(() => import('../pages/home'))

// 测试
const ReactTest = React.lazy(() => import('../pages/test'))

// 实现懒加载的用Suspense包裹 定义函数
const lazyLoad = (children: React.ReactNode): React.ReactNode => {
  return <React.Suspense fallback={<Loading />}>{children}</React.Suspense>
}

const routes: IRoute[] = [
  {
    path: '/login',
    title: '登录',
    component: <UserLayout />,
    meau: false,
    children: [
      {
        path: '/login',
        component: <Login />,
        title: '登录',
      },
    ],
  },
  {
    path: '/',
    component: <BasicLayout />,
    redirect: '/home',
    meau: true,
    children: [
      {
        path: '/home',
        component: lazyLoad(<Home />),
        title: '首页',
        meau: true,
        icon: 'LaptopOutlined',
      },
      {
        path: '/test',
        component: <Outletc />,
        title: '测试',
        meau: true,
        icon: 'UserOutlined',
        children: [
          {
            path: '/test',
            title: 'React测试',
            meau: true,
            component: lazyLoad(<ReactTest />),
          },
        ],
      },
    ],
  },
  {
    path: '*',
    component: Page404,
  },
]

export default routes
