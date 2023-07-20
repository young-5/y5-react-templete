import * as React from 'react'
import { Outlet, Link } from 'react-router-dom'
import cs from './index.module.less'
const UserLayout: React.FC = () => (
  <div className={cs.userlayout_root}>
    <div className={cs.userlayout_header}>
      <div> 登录布局</div>
      <Link to={'/home'}> 去首页</Link>
    </div>
    <div style={{ padding: '0 24px 24px' }}>
      <Outlet />
    </div>
  </div>
)

export default UserLayout
