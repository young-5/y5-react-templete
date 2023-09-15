import * as React from 'react'
import { Select } from 'antd'
import cl from 'classnames'
import cs from '../form.module.less'

const { Option } = Select
interface FormSelectProps {
  form: any
  value?: string
  formValue?: string
  onChange?: any
  options: any
  onFormChange?: any
  selectValue?: string
  selectLable?: string
  placeholder?: string
  className?: string
  childPops?: any
}
const FormSelect: React.FC<FormSelectProps> = (props) => {
  const { options } = props
  const {
    selectValue = 'value',
    selectLable = 'label',
    placeholder,
    className,
    value,
    formValue,
    onChange,
    onFormChange,
    childPops,
  } = props
  const handleChang = (value: string) => {
    onChange && onChange(value)
    onFormChange && onFormChange(value)
  }
  return (
    <div className={className}>
      <Select
        placeholder={placeholder}
        value={value || formValue}
        onChange={handleChang}
        {...childPops}>
        {options?.map((item: any, i: number) => {
          return (
            <Option value={item[selectValue]} key={i}>
              {item[selectLable]}
            </Option>
          )
        })}
      </Select>
    </div>
  )
}

export default FormSelect
