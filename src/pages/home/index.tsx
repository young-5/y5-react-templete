import * as React from 'react'
import cs from './index.module.less'
import { useNavigate } from 'react-router-dom'
const Home: React.FC = () => {
  const navigate = useNavigate()
  const goConter = (index: number) => {
    navigate('/docs', {
      state: { id: index + 1 },
      replace: true,
    })
  }
  return (
    <div className={cs.home_root}>
      <div className={cs.home_route}>
        {[
          {
            name: '项目架构',
          },
          {
            name: 'react基础',
          },
          { name: '项目基础配置' },
          { name: '项目优化' },
        ].map((v: any, i: number) => {
          return (
            <div className={cs.route_card} onClick={() => goConter(i)} key={i}>
              {v.name}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Home
