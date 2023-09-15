import * as React from 'react'
import { Input } from 'antd'
import cl from 'classnames'
import cs from '../form.module.less'
interface FormInputProps {
  value?: string
  maxLength?: number
  onChange?: any
  placeholder?: string
  className?: string
  childPops?: any
}
const FormInput: React.FC<FormInputProps> = (props) => {
  const { placeholder, className, childPops, maxLength, value, onChange } =
    props
  const { inputType, ...rest } = childPops
  const CP = inputType ? Input?.[inputType] : Input
  return (
    <div className={cl(cs.common_form_item, className)}>
      {maxLength && (
        <div className={cs.maxLength}>{`${
          value?.length || 0
        }/${maxLength}`}</div>
      )}
      <CP
        onChange={onChange}
        placeholder={placeholder}
        value={value}
        {...rest}
      />
    </div>
  )
}

export default FormInput
