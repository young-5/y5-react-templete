import * as React from 'react'
import cs from './index.module.less'
import { useNavigate } from 'react-router-dom'
import data from '@/datas/data'
import { Tag, Progress } from 'antd'
const Home: React.FC = () => {
  const navigate = useNavigate()
  const goConter = (index: number) => {
    navigate('/docs', {
      state: { id: index },
      replace: true,
    })
  }
  debugger
  return (
    <div className={cs.home_root}>
      <div className={cs.home_route}>
        {Object.keys(data).map((v: any, i: number) => {
          return (
            <div className={cs.route_card} onClick={() => goConter(v)} key={i}>
              <Tag
                color={
                  data[v].process == 1
                    ? 'success'
                    : data[v].process && data[v].process < 1
                    ? 'processing'
                    : 'red'
                }
                className={cs.route_card_tag}>
                {data[v].process == 1
                  ? 'done'
                  : data[v].process && data[v].process < 1
                  ? 'doing'
                  : 'to do'}
              </Tag>
              <Progress
                className={cs.route_card_progress}
                percent={data[v].process * 100}
                steps={5}
                size={10}
              />
              <div className={cs.title}> {data[v].title}</div>
            </div>
          )
        })}
        <div className={cs.route_card_hold} />
        <div className={cs.route_card_hold} />
        <div className={cs.route_card_hold} />
        <div className={cs.route_card_hold} />
      </div>
    </div>
  )
}

export default Home
