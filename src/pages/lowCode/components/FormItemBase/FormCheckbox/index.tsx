import * as React from 'react'
import { Checkbox, Row, Col } from 'antd'
import cl from 'classnames'
import cs from '../form.module.less'
interface FormCheckboxProps {
  value?: string
  maxLength?: number
  onChange?: any
  className?: string
  options: any[]
  selectValue?: string
  selectLable?: string
  ColWidth?: number
  childPops?: any
}
const FormCheckbox: React.FC<FormCheckboxProps> = (props) => {
  const {
    className,
    childPops,
    maxLength,
    value,
    onChange,
    options,
    ColWidth = 4,
    selectValue = 'value',
    selectLable = 'label',
  } = props

  return (
    <div className={cl(cs.common_form_item, className)}>
      {maxLength && (
        <div className={cs.maxLength}>{`${
          value?.length || 0
        }/${maxLength}`}</div>
      )}
      <Checkbox.Group
        style={{ width: '100%' }}
        onChange={onChange}
        value={value}
        {...childPops}>
        <Row style={{ width: '100%' }}>
          {options?.map((item: any, i: number) => {
            return (
              <Col span={ColWidth}>
                <Checkbox
                  value={item[selectValue]}
                  style={{ lineHeight: '32px' }}>
                  {item[selectLable]}
                </Checkbox>
              </Col>
            )
          })}
        </Row>
      </Checkbox.Group>
    </div>
  )
}

export default FormCheckbox
