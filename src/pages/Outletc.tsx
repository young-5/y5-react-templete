import * as React from 'react'
import { Outlet } from 'react-router-dom'
const OutletC: React.FC<any> = () => {
  return (
    <div>
      <Outlet />
    </div>
  )
}

export default OutletC
