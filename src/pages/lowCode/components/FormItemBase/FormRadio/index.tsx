import * as React from 'react'
import { Radio, Row, Col } from 'antd'
import cl from 'classnames'
import cs from '../form.module.less'
interface FormRadioProps {
  value?: string
  maxLength?: number
  onChange?: any
  className?: string
  options: any[]
  selectValue?: string
  selectLable?: string
  ColWidth?: number
  disabledArry: any[]
  childPops?: any
}
const FormRadio: React.FC<FormRadioProps> = (props) => {
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
    disabledArry = [],
  } = props

  return (
    <div className={cl(cs.common_form_item, className)}>
      {maxLength && (
        <div className={cs.maxLength}>{`${
          value?.length || 0
        }/${maxLength}`}</div>
      )}
      <Radio.Group
        style={{ width: '100%' }}
        onChange={onChange}
        value={value}
        {...childPops}>
        <Row style={{ width: '100%' }}>
          {options?.map((item: any, i: number) => {
            return (
              <Col span={ColWidth} key={i}>
                <Radio
                  value={item[selectValue]}
                  style={{ lineHeight: '32px' }}
                  disabled={disabledArry.includes(item[selectValue])}>
                  {item[selectLable]}
                </Radio>
              </Col>
            )
          })}
        </Row>
      </Radio.Group>
    </div>
  )
}

export default FormRadio
