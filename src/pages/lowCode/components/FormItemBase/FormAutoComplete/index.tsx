import * as React from 'react'
import { Select } from 'antd'
import cl from 'classnames'
import cs from '../form.module.less'

const { Option } = Select
interface FormAutoCompleteProps {
  form: any
  value?: string
  formValue?: string
  onChange?: any
  onFormChange?: any
  api?: any
  options: any
  selectValue?: string
  selectLable?: string
  placeholder?: string
  className?: string
  apiCallback?: any
  childPops?: any
}
const FormAutoComplete: React.FC<FormAutoCompleteProps> = (props) => {
  const { options } = props
  const {
    selectValue = 'value',
    selectLable = 'label',
    api,
    placeholder,
    className,
    value,
    formValue,
    onChange,
    onFormChange,
    apiCallback,
    childPops,
  } = props
  const [optionList, setOplitionList] = React.useState<any[]>(options)
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const handleChang = (value: string) => {
    onChange && onChange(value)
    onFormChange && onFormChange(value)
  }
  const debounce = (fn: any, delay: number) => {
    let timeout: any = null
    return (...args: any) => {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      timeout = setTimeout(() => {
        fn(...args)
      }, delay)
    }
  }
  React.useEffect(() => {
    if (api && value) {
      api(value).then((res) => {
        let data = apiCallback ? apiCallback(res) : res.data
        setOplitionList(data)
        setIsOpen(false)
      })
    }
  }, [])
  React.useEffect(() => {
    setIsOpen(false)
  }, [value])
  const _search = debounce((va1?: any) => {
    if (!va1) {
      setIsOpen(false)
      return
    }
    va1 && search(va1)
  }, 0)
  const search = (va1?: any) => {
    if (api) {
      api(va1).then((res) => {
        let data = apiCallback ? apiCallback(res) : res.data
        setOplitionList(data)
        va1 ? setIsOpen(false) : setIsOpen(true)
      })
    } else {
      let _option = options?.filter((v) => v[selectLable]?.includes(va1))
      setOplitionList([..._option])
      _option?.length > 0 && setIsOpen(true)
    }
  }
  return (
    <div className={cl(cs.common_form_item, className)}>
      <Select
        placeholder={placeholder}
        value={value || formValue}
        onChange={handleChang}
        open={isOpen}
        onBlur={() => {
          setIsOpen(false)
          setOplitionList([])
        }}
        filterOption={false}
        showSearch
        onSearch={_search}
        onFocus={() => {
          if (value) {
            _search(true)
          }
        }}
        {...childPops}>
        {optionList?.map((item: any, i: number) => {
          return (
            <Option value={item[selectValue]} key={item[selectValue]}>
              {item[selectLable]}
            </Option>
          )
        })}
      </Select>
    </div>
  )
}

export default FormAutoComplete
