import * as React from 'react'
import { Outlet } from 'react-router-dom'
const UserLayout: React.FC = () => (
  <div>
    <header>登录</header>
    <div style={{ padding: '0 24px 24px' }}>
      <Outlet />
    </div>
  </div>
)

export default UserLayout
