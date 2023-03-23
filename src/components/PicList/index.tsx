import { FC, useState } from 'react'
import cs from './index.module.less'

/**
 * css实现瀑布流
 * 等高瀑布流(flex) 等宽瀑布流(column-count 有兼容性问题)
 * @param props
 * @returns
 */
const PicList: FC<any> = (props) => {
  const { list = [], render } = props
  const [showType, setShowType] = useState<boolean>(false)
  return (
    <div>
      <div>
        <button
          onClick={() => {
            setShowType((cur) => !cur)
          }}>
          {!showType ? '定高 -->' : '顶宽 -->'}
        </button>
      </div>
      <div className={cs.resource_container}>
        <ul className={showType ? cs.img_ul : cs.img_ul_2}>
          {list?.map((v, i) => {
            return (
              <li className={cs.img_li}>
                <img key={i} src={v.src} />
                <div className={cs.img_info}>{v.name}</div>
                <div className={cs.img_mask} />
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default PicList
