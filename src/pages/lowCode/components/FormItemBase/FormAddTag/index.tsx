import * as React from 'react'
import { useState } from 'react'
import { Select, Tag } from 'antd'
import cl from 'classnames'
import cs from '../form.module.less'
interface FormAddTagProps {
  value?: any[]
  formValue: any
  maxLength?: number
  onChange?: any
  onFormChange?: any
  placeholder?: string
  className?: string
  childPops?: any
}
const FormAddTag: React.FC<FormAddTagProps> = (props) => {
  const {
    placeholder,
    className,
    formValue,
    maxLength,
    onFormChange,
    value,
    onChange,
    childPops,
  } = props
  const [tagForce, setTagForce] = useState<boolean>(false)
  const [validError, setValidError] = useState<string[]>(['mmp'])
  const onBlur = () => {
    setTagForce(false)
  }
  const onFocus = () => {
    setTagForce(true)
  }
  const _onChange = (newTag: any) => {
    onchange && onChange(newTag)
    onFormChange && onFormChange(newTag)
    // 校验合规 setValidError
  }
  const onPreventMouseDown = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }
  const handleValidError = (value: string) => {
    return validError?.find((v) => v?.includes(value))
  }
  const renderTag = ({ label, closable, onClose }: any) => {
    return (
      <Tag
        color={handleValidError(label) ? 'red' : ''} // 判断是否合规
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginRight: '5px' }}>
        {label}
      </Tag>
    )
  }
  return (
    <div
      className={cl(
        cs.common_form_item,
        tagForce ? cs.tag_force : '',
        className,
      )}>
      {maxLength && (
        <div className={cs.maxLength}>{`${
          value?.length || 0
        }/${maxLength}`}</div>
      )}
      <Select
        mode='tags'
        size='large'
        open={false}
        onFocus={onFocus}
        onBlur={onBlur}
        value={[...(value || formValue || [])]}
        onChange={_onChange}
        placeholder={placeholder}
        tagRender={renderTag}
        maxTagTextLength={5}
        maxTagCount={20}
        {...childPops}
      />
    </div>
  )
}

export default FormAddTag
