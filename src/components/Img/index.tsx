import { FC, useState, useRef, useEffect } from 'react'
import cs from './index.module.less'
import cl from 'classnames'

interface ImgPops {
  src: string
  isAdaption?: boolean // 是否缩放
  adaptionRate?: number //比例值 判断是按高度 还是宽缩放
  boxRef?: any //载体宽高比例
  boxRate?: any // 载体的
  loadImgSrc?: any // 加载中占位图
  errImgSrc?: any //错误显示图
  className?: any
  style?: any
}

const CLASS_TYPE = {
  H: cs.img_h,
  W: cs.img_w,
  N: cs.img_n,
}

const Img: FC<ImgPops> = (props) => {
  const {
    src,
    className,
    isAdaption,
    adaptionRate = 0.9,
    boxRef,
    boxRate, // h/w
    errImgSrc,
    loadImgSrc,
    style,
  } = props
  const imgRef = useRef(null)
  const [imgSrc, setImgSrc] = useState(src)
  const [loadImg, setLoadImg] = useState(true)
  const [isError, setIsError] = useState(false)
  const [classType, setClassType] = useState(CLASS_TYPE.N)
  const imgOnload = () => {
    const _Img = new Image()
    _Img.src = src
    // 当载体小于图片尺寸 根据图片比例 和 载体尺寸决定 缩小的基准
    const handleAdaptionType = () => {
      const height = _Img.height
      const width = _Img.width
      // 图片 高度长
      if (height / width > adaptionRate) {
        // 如果 box 高度/宽度 比例 和 adaptionRate 相反 特殊处理
        if (height / width > boxRate) {
          setClassType(CLASS_TYPE.H)
        } else {
          setClassType(CLASS_TYPE.W)
        }
      } else {
        // 图片 宽度长
        if (height / width > boxRate) {
          setClassType(CLASS_TYPE.H)
        } else {
          setClassType(CLASS_TYPE.W)
        }
      }
    }
    _Img.onload = () => {
      if (isAdaption) {
        let _boxRef = boxRef && boxRef()
        if (_boxRef) {
          const boxH = _boxRef.clientHeight
          const boxW = _boxRef.clientWidth
          const imgH = _Img.naturalHeight
          const imgW = _Img.naturalWidth
          if (boxH > imgH && boxW > imgW) {
            setClassType(CLASS_TYPE.N)
          } else {
            handleAdaptionType()
          }
        } else {
          handleAdaptionType()
        }
      }
      setImgSrc(src)
      setLoadImg(false)
    }
    _Img.onerror = () => {
      setIsError(true)
      errImgSrc && setImgSrc(errImgSrc)
      setLoadImg(false)
    }
  }
  useEffect(() => {
    src && imgOnload()
  }, [src, boxRef, isAdaption])
  return (
    <img
      src={imgSrc}
      ref={imgRef}
      className={cl(cs.img_default, classType, className)}
      style={style}
    />
  )
}

export default Img
