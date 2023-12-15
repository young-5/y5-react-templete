import * as React from 'react'
// import { useStore } from '@/models'
import { useLocation } from 'react-router-dom'
// import { observer } from 'mobx-react-lite'
const Page404 = React.lazy(() => import('../pages/404'))
const Login = React.lazy(() => import('../pages/user/login'))
interface AuthRouterProps {
  route: any
  children: React.ReactNode
}
const AuthRouter: React.FC<AuthRouterProps> = ({ route, children }) => {
  let store: any = {} //useStore()
  const user = store.user || {}
  const location = useLocation()
  // 是否登錄
  const tokenAuth = () => {
    const token = localStorage.getItem('token')
    // return token
    return true
  }
  // menu权限判断
  const tokenMenu = (menu, route) => {
    let _menu: string[] = []
    let getMeauKey = (data, result): any => {
      data?.forEach((v) => {
        result.push(v.id)
        if (v.children) {
          return getMeauKey(v.children, result)
        }
      })
    }
    getMeauKey(menu, _menu)
    return true
  }
  const render = () => {
    // return props.children
    if (!tokenAuth()) {
      return <Login />
    } else {
      // if (!user.UserInfo) {
      //   return <span>loading...</span>
      // }
      // if (!tokenMenu(user.UserInfo.menu, location.pathname)) {
      //   return <Page404 />
      // }
      return children
    }
  }
  return <div>{render()}</div>
}

export default AuthRouter // observer(AuthRouter)
