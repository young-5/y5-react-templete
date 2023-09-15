import * as React from 'react'
import { useCallback, useEffect, useReducer } from 'react'
import { Table } from 'antd'

interface ItableProps {
  baseProps?: any
  searchPrams: any
  fetchApi: any
  columns: any
  [key: string]: any
}

const TableCP: React.FC<ItableProps> = (props) => {
  const { baseProps, fetchApi, searchPrams, columns } = props

  const page = {
    current: 1,
    pageSize: 10,
    total: 0,
  }

  const initState = {
    loading: false,
    pagination: page,
    dataSource: [],
  }

  const reducer = (state, action) => {
    const { payload } = action
    switch (action.type) {
      case 'TADLE_LOADING': // loading
        return { ...state, loading: payload.loading }
      case 'SET_PAGE': // page
        return { ...state, pagination: payload.pagination }
      case 'SET_DATASOURCE': // dataSouce
        return { ...state, dataSource: payload.dataSource }
      default:
        return state
    }
  }
  const [state, dispatch] = useReducer(reducer, initState)
  // 获取数据
  const fetchFun = async () => {
    dispatch({
      type: 'TADLE_LOADING',
      payload: {
        loading: true,
      },
    })
    let res = await fetchApi({
      ...searchPrams,
    }).catch((err) => {
      console.log(err)
      return false
    })
    dispatch({
      type: 'TADLE_LOADING',
      payload: {
        loading: false,
      },
    })
    if (res) {
      //   const { total, data } = res
      // console.log(state?.pagination?.current)
      dispatch({
        type: 'SET_PAGE',
        payload: {
          pagination: {
            ...state.pagination,
            total: res.total,
          },
        },
      })
      dispatch({
        type: 'SET_DATASOURCE',
        payload: {
          dataSource: res.data,
        },
      })
    }
  }
  const fetchDataWarp = useCallback(fetchFun, [
    searchPrams,
    state?.pagination?.current,
    state.pagination?.pageSize,
    columns,
    fetchApi,
  ])
  // 页码变化
  const handleTableChnage = (payload: any) => {
    if (payload) {
      const { current, pageSize } = payload
      dispatch({
        type: 'SET_PAGE',
        payload: {
          ...state.pagination,
          current,
          pageSize,
        },
      })
    }
  }
  // 自己改变 触发
  useEffect(() => {
    fetchDataWarp()
  }, [fetchDataWarp])
  return (
    <div>
      <Table
        columns={columns(fetchFun)}
        dataSource={state.dataSource}
        loading={state.loading}
        onChange={handleTableChnage}
        pagination={state.pagination}
        {...baseProps}
      />
    </div>
  )
}

export default React.memo(TableCP)
