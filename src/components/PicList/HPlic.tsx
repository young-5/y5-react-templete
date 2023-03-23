import { FC, useEffect, useRef, useImperativeHandle, forwardRef } from 'react'
import cs from './HPlic.module.less'

interface HPicPops {
  list?: any[] // 源数据
  id?: any // 载体id
  width?: number // 图片宽度
  imgClassName?: any // 列表数据 单个dom载体class
  render?: any // 自定义显示
  children?: React.ReactNode
}
/**
 * js等宽瀑布流
 * 注意：多图片加载性能问题，建议结合懒加载
 * @param props
 * @returns
 */
const HPic = (props: HPicPops, ref: any) => {
  const { list, render, id, imgClassName, width, children } = props
  useImperativeHandle(ref, () => {
    return {
      imgLocation,
    }
  })
  const isInit = useRef(true)
  const imgLocation = async (id: string, imgClass: any) => {
    let parentDom: HTMLElement = document.getElementById(id) // 载体dom
    if (!parentDom) {
      return
    }
    let imgDomList: HTMLElement[] = getChildElemnt(parentDom, imgClass) // 所有item
    let imgWidth = width || imgDomList?.[0]?.offsetWidth // 第一张图片宽度
    let num = Math.floor(parentDom.clientWidth / imgWidth) // 一行多少列
    const white = Math.floor(
      (parentDom.offsetWidth - num * imgWidth) / (num + 1),
    ) //缝隙
    // parentDom.style.width = `${imgWidth * num}px` // 宽度设置
    let BoxHeightArr = []
    for (let i = 0; i < imgDomList.length; i++) {
      if (i < num) {
        if (isInit.current) {
          await waitImgLoaded(imgDomList[i])
        }
        BoxHeightArr[i] = imgDomList[i].offsetHeight
        imgDomList[i].style.position = 'absolute'
        imgDomList[i].style.top = 0 + 'px'
        imgDomList[i].style.left =
          imgWidth * i + Math.floor(i + 1) * white + 'px'
      } else {
        let minHeight: number = Math.min.apply(null, BoxHeightArr) // 列最小高度
        let minIndex = getMinHeightLocation(BoxHeightArr, minHeight) // 最小高度 index
        imgDomList[i].style.position = 'absolute'
        imgDomList[i].style.top = minHeight + 'px'
        imgDomList[i].style.left = imgDomList[minIndex].offsetLeft + 'px'
        BoxHeightArr[minIndex] =
          BoxHeightArr[minIndex] + imgDomList[i].offsetHeight
      }
    }
    isInit.current = false
  }
  // 获取图片数据列表
  const getChildElemnt = (parent: HTMLElement, className: string) => {
    const imgBoxList = [] // dom列表
    const imgBoxs = parent.getElementsByClassName(className) // 载体下 获取所有标签
    for (let i = 0; i < imgBoxs.length; i++) {
      imgBoxList.push(imgBoxs[i])
    }

    return imgBoxList
  }
  function getMinHeightLocation(BoxHeightArr: any, minHeight: any): number {
    for (let i in BoxHeightArr) {
      if (BoxHeightArr[i] === minHeight) {
        return Number(i)
      }
    }
  }
  //   等待所有图片加载完成
  const waitImgLoaded = async (root: HTMLImageElement | HTMLElement) => {
    const imgs: any =
      root instanceof HTMLImageElement ? [root] : root.querySelectorAll('img')
    await Promise.all(
      [...imgs].map(
        (img: any) =>
          new Promise((resolve) => {
            if (img.offsetHeight) {
              resolve(img)
            } else {
              img.addEventListener('load', () => {
                resolve(img)
              })
            }
          }),
      ),
    )
  }

  useEffect(() => {
    imgLocation(id || 'HPlic', imgClassName || cs.list_item_box)
    window.onresize = () => {
      imgLocation(id || 'HPlic', imgClassName || cs.list_item_box)
    }
  }, [list])
  return render ? (
    render.isChildren ? (
      children
    ) : (
      render(list)
    )
  ) : (
    <div className={cs.HPlic}>
      <div id='HPlic' className={cs.list_box}>
        {list?.map((v: any, i: number) => {
          return (
            <div key={i} className={cs.list_item_box}>
              <div className={cs.list_item}>
                <img src={v.src} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default forwardRef(HPic)
