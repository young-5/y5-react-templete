import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import cl from 'classnames'
import cs from './index.module.less'
interface GoBack {
  value?: string
  className?: string
  isGohome?: boolean
  onClick?: () => void
  style?: React.CSSProperties
}
const GoBack: FC<GoBack> = (props) => {
  const navigate = useNavigate()
  const { value = '< 返回', className, onClick, isGohome = true, style } = props
  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      goBack()
    }
  }
  const goBack = () => {
    isGohome ? navigate('/home') : navigate(-1)
  }
  return (
    <div
      className={cl(cs.goback, className)}
      onClick={handleClick}
      style={style}>
      {value}
    </div>
  )
}

export default GoBack
