import { useEffect, useState } from 'react'
import useThrottle from './useDebounce'

interface LazyLoadPropsType {
  domList: any
  imgList: any
  throttle: number
  srollRef: any
}

const useLazyLoad = ({
  domList,
  imgList,
  throttle,
  srollRef = document.documentElement,
}: LazyLoadPropsType) => {
  const [scrollCount, setScrollCount] = useState(0)

  // 节流
  const loadImg = useThrottle(
    () => {
      domList.forEach((el, i) => {
        // 已经加载的无需继续加载
        if (!el || imgList[i].loaded) return
        // 加载条件：判断元素在视口内，即图片距离页面顶部的距离 offsetTop < 滚动条高度+视口高
        if (el.offsetTop < srollRef?.scrollTop + srollRef?.clientHeight) {
          el.src = el.dataset.src as string
          imgList[i].loaded = true
        }
      })
    },
    throttle,
    [domList, imgList, throttle, srollRef],
  )

  const beginLoad = () => {
    setScrollCount((v) => v + 1)
  }

  // 监听scroll事件
  useEffect(() => {
    srollRef?.addEventListener('scroll', beginLoad)
    return () => srollRef?.removeEventListener('scroll', beginLoad)
  }, [srollRef])

  // 开始计算懒加载图片位置
  useEffect(() => {
    loadImg()
  }, [loadImg, scrollCount])

  const init = () => {
    setScrollCount(Math.random())
  }

  return {
    init,
  }
}

export default useLazyLoad
