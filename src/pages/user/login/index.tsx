import * as React from 'react'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
const Home: React.FC = () => {
  const navigate = useNavigate()
  const goConter = () => {
    navigate('/test')
  }
  return (
    <div>
      <div>登录</div>
      <Button onClick={goConter}>去主系统</Button>
    </div>
  )
}

export default Home
