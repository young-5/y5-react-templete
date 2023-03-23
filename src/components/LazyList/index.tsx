import { useRef, useEffect } from 'react'

interface LazyListPops {
  imgList: any // 数据源
  maxLoadindNum: number // 一次加载阀值
  render?: any // 自定义显示
}
/**
 * 分批加载组件
 * @description 避免一次请求太多导致卡顿
 * @param props LazyListPops
 * @returns
 */
const LazyList: React.FC<LazyListPops> = (props) => {
  const { imgList, maxLoadindNum, render } = props
  const imgRef = useRef<any>([])
  const loadImages = () => {
    const needToLoadList = [...imgList] // 总加载数据
    const maxLoadedNum = maxLoadindNum // 加载上限
    let index = 0
    const curLoadedImgList: string[] = []
    const imageDoms = imgRef.current // 加载dom
    const startLoadImg = (index: number) => {
      if (curLoadedImgList.length >= maxLoadedNum) {
        //到达加载上线
        return
      }
      if (needToLoadList.length < index) {
        // 加载完成
        return
      }
      const img = imageDoms[index] //获取当前加载dom
      const imgDataSource = needToLoadList[index] // 获取加载数据
      if (!imgDataSource) {
        return
      }
      curLoadedImgList.push(imgDataSource)
      img.setAttribute('src', imgDataSource.src)
      img.setAttribute('data-imageId', imgDataSource.imageId)
      img.setAttribute('data-index', `${index}`)
      img.addEventListener('load', (e: any) => {
        //加载完成 下一个
        removeAndReloadImg(e, true, img)
      })
      img.addEventListener('error', (e: any) => {
        //加载失败 下一个
        removeAndReloadImg(e, false, img)
      })
      index = index + 1
      startLoadImg(index)
    }

    const removeAndReloadImg = (e: any, success: boolean, img: any) => {
      if (e) {
        const loadedImageId = Number(e.target.getAttribute('data-imageId'))
        curLoadedImgList.splice(
          curLoadedImgList.findIndex(
            (item: any) => item.imageId === loadedImageId,
          ), //位置
          1,
        )
        index = index + 1
        startLoadImg(index)
      }
    }
    startLoadImg(index)
  }
  useEffect(() => {
    imgList?.length > 0 && loadImages()
  }, [imgRef.current])
  return (
    <div>
      {imgList?.map((v: any, index: number) => {
        return render ? render(v, index, imgRef.current) : null
      })}
    </div>
  )
}

export default LazyList
