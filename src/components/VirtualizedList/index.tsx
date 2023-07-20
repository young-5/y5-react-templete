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
  useEffect(() => {
    setCurListData(list.slice(0, 10))
  }, [list])

  const [curListData, setCurListData] = useState([])
  const [endIndex, setEndIndex] = useState(0) //初始数据
  const [noMore, setNoMore] = useState(false)
  const handleScroll = () => {
    const scrollclientHeight = scrollRef.current.clientHeight
    const scrollHeight = scrollRef.current.scrollHeight
    const clientHeight = clientRef.current.clientHeight // 可是区域的高度
    const scrollTop = clientRef.current.scrollTop // “元素中的内容”超出“元素上边界”的那部分的高度。
    const visibleCount = Math.ceil((scrollTop + clientHeight) / 50)
    // const start = Math.floor(scrollTop / this.itemHeight)
    if (!noMore && visibleCount >= endIndex) {
      const end = endIndex + viewCount
      if (end > list.length) {
        setNoMore(true)
      }
      setEndIndex(end)
      const start = end - clientHeight / 50
      console.log('start', start)
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
