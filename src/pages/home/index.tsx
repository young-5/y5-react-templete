import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import cs from './index.module.less'
const Home: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div className={cs.home_root}>
      <div className={cs.home_container}>Hello world !</div>
    </div>
  )
}

export default Home
