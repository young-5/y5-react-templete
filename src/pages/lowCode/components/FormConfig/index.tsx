import * as React from 'react'
import { useEffect } from 'react'
import { Form, Button } from 'antd'
import {
  FormInput,
  FormSelect,
  FormColor,
  FormCheckTag,
  FormAddTag,
  FormAutoComplete,
  FormCheckbox,
  FormRadio,
} from '../FormItemBase'
import cs from '../../index.module.less'
import cl from 'classnames'
import { FormItemProps } from 'antd/lib/form/FormItem'

interface formItemProps {
  name: string //字段名
  label: string // 字段value
  type: string // 组件类型
  rules?: any //校验规则
  maxLength?: number // 多选长度
  mode?: string //模型 单多选等
  options?: any[] // 下拉 多选 tag等数据来源
  placeholder?: string //占位符
  disabledArry?: any[] //禁用数据
  childPops?: any //基础组件pros
}

interface FormConfigProps {
  initialValues?: any
  form?: any
  formItems?: formItemProps[]
  layout?: any
  onValueChange?: any
  className?: string
}

const FormItemType = {
  input: FormInput,
  select: FormSelect,
  color: FormColor,
  checkTag: FormCheckTag,
  addTag: FormAddTag,
  autoCp: FormAutoComplete,
  checkbox: FormCheckbox,
  radio: FormRadio,
}

const FormConfig: React.FC<FormConfigProps> = (props) => {
  const {
    form,
    formItems,
    layout = 'vertical',
    initialValues,
    className,
  } = props
  // const [form] = Form.useForm(null)
  useEffect(() => {}, [])
  const onFinish = (values: any) => {
    console.log('Success:', values)
    // form
    //   .validateFields()
    //   .then((values) => {
    //     console.log('value', values)
    //   })
    //   .catch((err) => {
    //     console.log('err', err)
    //   })
  }

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo)
  }
  const onChange = (value: string, item: any, isArry = false) => {
    form.setFieldsValue({
      [item.name]: value,
    })
  }
  const renderCp = (item: any, i: number) => {
    if (item.render) {
      return item.render(item, i)
    } else {
      const {
        options,
        placeholder = `请输入${item.label}`,
        type,
        maxLength,
        mode,
        disabledArry,
        childPops = {},
      } = item
      if (type === 'select') {
        const _onChange = (value?: string) => {
          form.setFieldsValue({
            [item.name]: value,
          })
        }
        const value = form.getFieldValue(item.name) || initialValues[item.name]
        return (
          <FormSelect
            value={value}
            form={form}
            onChange={_onChange}
            options={options}
            placeholder={placeholder}
            childPops={childPops}
          />
        )
      }
      const Cp = FormItemType[item.type]
      const value = form.getFieldValue(item.name) || initialValues[item.name]
      return (
        <Cp
          options={options}
          onFormChange={(value: any, isArry?: boolean) => {
            onChange(value, item, isArry)
          }}
          mode={mode}
          maxLength={maxLength}
          formValue={value}
          placeholder={placeholder}
          childPops={childPops}
          disabledArry={disabledArry}
        />
      )
    }
  }

  return (
    <div className={cs.form_Config}>
      <Form
        name='form_config'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 24 }}
        layout={layout}
        style={{ maxWidth: 600 }}
        initialValues={initialValues}
        form={form}
        className={cl(cs.common_form, className)}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete='off'>
        {formItems?.map((item: FormItemProps, i: number) => {
          const { name, label, rules } = item
          return (
            <Form.Item name={name} label={label} rules={rules} key={i}>
              {renderCp(item, i)}
            </Form.Item>
          )
        })}

        <Form.Item wrapperCol={{ offset: 18, span: 3 }}>
          <Button type='primary' htmlType='submit'>
            提交
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default FormConfig
