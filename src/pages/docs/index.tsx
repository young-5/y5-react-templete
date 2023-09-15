import { useState, useEffect, FC } from 'react'
import cs from './index.module.less'
import {
  useNavigate,
  useParams,
  useSearchParams,
  useLocation,
} from 'react-router-dom'
import { Anchor, Affix } from 'antd'
import { GoBack } from '@/components'
import Obj from '@/datas/data'
const Docs: FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { id } = location.state || {}
  useEffect(() => {
    let data = []
    Obj[id]?.data?.forEach((v, i) => {
      data.push({
        key: `${i}${v.name}`,
        href: `#${i}${v.name}`,
        title: v.name,
      })
    })
    setAnchorItmes(data)
  }, [id])
  const [anchorItems, setAnchorItmes] = useState([])
  debugger
  return (
    <div className={cs.docs_root}>
      <div className={cs.docs_title}>
        <div>文档 : {Obj[id]?.title}</div>
        <GoBack style={{ textAlign: 'right' }} />
      </div>
      <div className={cs.docs_route}>
        <div className={cs.docs_route_title}>{Obj[id]?.title}</div>
        {Obj[id]?.data.map((v: any, i: number) => {
          return (
            <div className={cs.route_card} id={`${i}${v.name}`} key={i}>
              <div className={cs.item_name}> {v.name}</div>
              {Array.isArray(v.desc) ? (
                <div className={cs.item_card}>
                  {v.desc.map((item: any, j: number) => {
                    return (
                      <div key={j} className={cs.card_item}>
                        {j + 1 + '、' + item}
                      </div>
                    )
                  })}
                </div>
              ) : (
                v.desc
              )}
            </div>
          )
        })}
      </div>
      <Affix
        style={{ position: 'absolute', top: 200, right: 10 }}
        offsetTop={10}
        onChange={(affixed) => console.log(affixed)}>
        <Anchor
          getContainer={() =>
            document.getElementById('baseCustomScroll') || document.body
          }
          // targetOffset={0}
          items={anchorItems}
          onClick={(e, link) => {
            e.preventDefault()
            const id = link.href.slice(1)
            if (id) {
              const targer = document.getElementById(link.href)
              if (targer) {
                targer.scrollIntoView({ behavior: 'smooth' })
              }
            }
          }}
        />
      </Affix>
    </div>
  )
}

export default Docs
