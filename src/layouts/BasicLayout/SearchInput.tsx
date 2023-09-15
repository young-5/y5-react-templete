import { Input, message } from 'antd'
import * as React from 'react'
import { AudioOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
interface SearchInput {
  onSearch?: (value?: string) => void
  width?: number | string
  loading?: boolean
  searchValue?: string
}

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#18ff16',
    }}
  />
)

const { Search } = Input

const SearchInput: React.FC<SearchInput> = (props) => {
  const { onSearch, width = 300, loading, searchValue } = props
  const navigate = useNavigate()
  const [inputValue, setInputValue] = React.useState<string>('')
  React.useEffect(() => {
    setInputValue(searchValue)
  }, [searchValue])
  const _onSearch = (
    value: string,
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.MouseEvent<HTMLElement, MouseEvent>
      | React.KeyboardEvent<HTMLInputElement>,
  ) => {
    console.log('查询：', value)
    // // if(event.target)
    if (onSearch) {
      onSearch(value)
    } else {
      goSearch(value)
    }
  }
  const goSearch = (value: string) => {
    if (value) {
      message.info('开发中')
    } else {
      message.info('请输入关键词查询')
    }
  }

  return (
    <div>
      <Search
        placeholder='请输入关键词'
        allowClear
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value)
        }}
        style={{ width: width }}
        size='large'
        suffix={suffix}
        onSearch={_onSearch}
        loading={loading}
      />
    </div>
  )
}

export default SearchInput
