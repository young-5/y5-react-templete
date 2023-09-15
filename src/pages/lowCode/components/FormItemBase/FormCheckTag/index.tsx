import * as React from 'react'
import { Input } from 'antd'
import cl from 'classnames'
import cs from '../form.module.less'
interface FormCheckTagProps {
  mode?: String
  value?: string[]
  maxLength?: number
  onChange?: any
  onFormChange?: any
  formValue?: any
  placeholder?: string
  options?: []
  selectValue?: string
  selectLable?: string
  className?: string
  childPops?: any
}
const FormCheckTag: React.FC<FormCheckTagProps> = (props) => {
  const {
    mode,
    onChange,
    selectLable = 'label',
    value = [],
    selectValue = 'value',
    className,
    maxLength,
    options,
  } = props
  const handleClick = (item: any) => {
    if (mode == 'one') {
      return onChange(item[selectValue])
    } else {
      if (value?.find((v) => v == item[selectValue])) {
        let _value = value.filter((v) => v != item[selectValue])
        onChange(_value) // 默认表单方法
      } else {
        let _value = [...value, item[selectValue]]
        onChange(_value)
      }
    }
  }
  return (
    <div
      className={cl(cs.common_form_item, cs.common_form_checkTag, className)}>
      {mode != 'one' && maxLength && (
        <div className={cs.maxLength}>{`${value?.length}/${maxLength}`}</div>
      )}
      <div className={cs.tag_list}>
        {options?.map((item: any, i: number) => {
          return (
            <div
              className={cl(
                (
                  Array.isArray(value)
                    ? value?.includes(item[selectValue])
                    : value == item[selectValue]
                )
                  ? cs.checked_item
                  : '',
                cs.tag_item,
              )}
              onClick={() => {
                handleClick(item)
              }}>
              {item[selectLable]}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default FormCheckTag
