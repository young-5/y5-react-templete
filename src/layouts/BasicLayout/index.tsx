import * as React from 'react'
import { Outlet } from 'react-router-dom'
const BasicLayout: React.FC = () => (
  <div>
    <header>主系统</header>
    <div style={{ padding: '0 24px 24px' }}>
      <Outlet />
    </div>
  </div>
)

export default BasicLayout
