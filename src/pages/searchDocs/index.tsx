import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Empty } from 'antd'
import Obj from '@/datas/data'
import { list } from '@/datas/todolist'
import { LoadingOutlined } from '@ant-design/icons'
import SearchInput from '@/layouts/BasicLayout/SearchInput'
import { GoBack } from '@/components'
import cl from 'classnames'
import cs from './index.module.less'

const SearchDocs: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { value = '' } = location?.state || {}
  const [searchData, setSearchData] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const handleSerch = (value: string) => {
    setLoading(true)
    let result = []
    if (value) {
      onSerchObj(Obj, value, result)
    }
    console.log('result', result)
    setTimeout(() => {
      setSearchData(result)
      setLoading(false)
    }, 1000)
  }

  useEffect(() => {
    handleSerch(value)
    return () => {
      setSearchData([])
    }
  }, [value])

  const goDocs = (v) => {
    v.id &&
      navigate('/docs', {
        state: { id: v.id },
      })
  }

  const onSerchObj = (
    dataObj: Record<string, any>,
    value: string,
    result: any[],
    id?: string,
    title?: string,
  ) => {
    if (id) {
      let desc = Array.isArray(dataObj.desc)
        ? dataObj.desc?.join(',')
        : dataObj.desc

      if (dataObj?.name?.includes(value) || desc?.includes(value)) {
        result.push({
          id: id,
          title: title,
          ...dataObj,
        })
      }
    } else {
      Object.keys(dataObj)?.forEach((key) => {
        let data = dataObj[key]
        if (data?.title?.includes(value)) {
          result.push({
            id: id || key,
            level: 1,
            ...Obj[key],
          })
        } else {
          if (data?.data?.length > 0) {
            data?.data?.forEach((v) => {
              onSerchObj(v, value, result, key, data?.title || '')
            })
          }
        }
      })
    }
  }

  const renderText = (obj: Record<string, any>) => {
    if (obj.level == 1) {
      return obj.data?.length > 0
        ? `${obj?.data[0]?.name}：${renderText(obj.data[0])}`
        : ''
    } else {
      return Array.isArray(obj?.desc) ? obj.desc.join(',') : obj.desc
    }
  }
  return (
    <div className={cs.search_docs_root}>
      <div className={cs.search_docs_header}>
        <GoBack />
        <div className={cs.search_docs_search}>
          <SearchInput
            searchValue={value}
            width={600}
            onSearch={handleSerch}
            loading={loading}
          />
        </div>
      </div>
      <div className={cs.search_docs_route}>
        <div className={cs.search_left}>
          {loading ? (
            <LoadingOutlined style={{ marginTop: '80px' }} />
          ) : (
            <>
              {searchData?.length > 0 ? (
                <div className={cs.search_docs_list}>
                  {searchData?.map((v: any, i: number) => {
                    return (
                      <div
                        key={i}
                        className={cs.search_docs_item}
                        onClick={() => {
                          goDocs(v)
                        }}>
                        <div>{`${v?.title} ${v?.name || ''}`}</div>
                        <div>{renderText(v)}</div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <Empty
                  style={{ marginTop: '100px' }}
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                />
              )}
            </>
          )}
        </div>
        <div className={cs.search_right}>
          {list?.map((v, i) => {
            return (
              <div
                onClick={() => {
                  goDocs(v)
                }}
                className={cl(
                  cs.todo,
                  v.process === 1 ? cs.todo_ed : !v.process ? cs.todo_nodo : '',
                )}>
                <div title={v.name}>{`${i + 1}、${v.name}`}</div>
                <div className={cs.todo_value} title={v.value}>
                  {v.value}
                </div>
                <div>
                  {v.process
                    ? v.process == 1
                      ? '已完成'
                      : `${v.process * 100}%`
                    : '未开始'}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default SearchDocs
