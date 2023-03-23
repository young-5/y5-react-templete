import { useRef, useState, useEffect } from 'react'
import cs from './index.module.less'

interface VirtualizedListProps {
  list: any[]
  viewCount?: number
  render?: any
}

// 数据虚拟加载 懒加载
const VirtualizedList: React.FC<VirtualizedListProps> = (props) => {
  const { list = [], viewCount = 10, render } = props
  const clientRef = useRef(null)
  const scrollRef = useRef(null)
  useEffect(() => {
    handleScroll()
  }, [])

  const [curListData, setCurListData] = useState([])
  const [endIndex, setEndIndex] = useState(15) //初始数据
  const [noMore, setNoMore] = useState(false)
  const handleScroll = () => {
    const scrollHeight = scrollRef.current.clientHeight
    const clientHeight = clientRef.current.clientHeight
    const scrollTop = clientRef.current.scrollTop
    if (!noMore && scrollHeight - scrollTop <= clientHeight) {
      const end = endIndex + viewCount
      if (end > list.length) {
        setNoMore(true)
      }
      setEndIndex(end)
      setCurListData(list.slice(0, end))
    }
  }
  return (
    <div onScroll={handleScroll} ref={clientRef} className={cs.box}>
      <div ref={scrollRef} className={cs.scroll}>
        {curListData?.map((v: any, i: number) => {
          return render ? render(v, i) : <div key={v.id}>{v.name}</div>
        })}
      </div>
    </div>
  )
}

export default VirtualizedList
