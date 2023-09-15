import * as React from 'react'
import { Input } from 'antd'
import cl from 'classnames'
import cs from '../form.module.less'
interface FormColorProps {
  value?: string[]
  maxLength?: number
  onChange?: any
  placeholder?: string
  options?: []
  selectValue?: string
  selectLable?: string
  className?: string
  childPops?: any
}
const FormColor: React.FC<FormColorProps> = (props) => {
  const {
    onChange,
    selectLable = 'label',
    value = [],
    selectValue = 'value',
    className,
    maxLength,
    options,
  } = props
  const handleClick = (item: any) => {
    if (value?.find((v) => v == item[selectValue])) {
      let _value = value.filter((v) => v != item[selectValue])
      onChange(_value)
    } else {
      let _value = [...value, item[selectValue]]
      onChange(_value)
    }
  }
  return (
    <div
      className={cl(cs.common_form_item, cs.common_form_item_color, className)}>
      {maxLength && (
        <div className={cs.maxLength}>{`${value?.length}/${maxLength}`}</div>
      )}
      <div className={cs.color_list}>
        {options?.map((item: any, i: number) => {
          return (
            <div
              className={cl(
                value?.includes(item[selectValue]) ? cs.check_color : '',
                cs.color_item,
              )}
              onClick={() => {
                handleClick(item)
              }}>
              <div
                className={cs.color_item_block}
                style={{
                  background: `#${item[selectValue]}`,
                }}
              />
              {item[selectLable]}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default FormColor
