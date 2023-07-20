import * as React from 'react'
import cs from './index.module.less'
import {
  useNavigate,
  useParams,
  useSearchParams,
  useLocation,
} from 'react-router-dom'
import Obj from './data'
const Docs: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { id } = location.state
  const goBack = () => {
    navigate('/home')
  }
  React.useEffect(() => {
    console.log(id)
  }, [id])
  return (
    <div className={cs.docs_root}>
      <div className={cs.docs_title}>
        <div>DOCS</div>
        <div className={cs.docs_goback} onClick={goBack}>
          返回
        </div>
      </div>
      <div className={cs.docs_route}>
        <div className={cs.docs_route_title}>{Obj[id]?.title}</div>
        {Obj[id]?.data.map((v: any, i: number) => {
          return (
            <div className={cs.route_card} key={i}>
              <div className={cs.item_name}> {v.name}</div>
              {Array.isArray(v.desc) ? (
                <div className={cs.item_card}>
                  {v.desc.map((item: any, j: number) => {
                    return <div key={j}>{j + 1 + '、' + item}</div>
                  })}
                </div>
              ) : (
                v.desc
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Docs
