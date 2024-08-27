import { Pagination, PaginationProps } from 'antd'
import React, { FC, useEffect, useState } from 'react'
import {
  LIST_PAGE_PARAM_KEY,
  LIST_PAGESIZE_LIMIT,
  LIST_PAGESIZE_PARAM_KEY,
} from '../constant/searchConstant'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'

type propsType = {
  total: number
}
const ListPage: FC<propsType> = props => {
  const { total } = props
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(LIST_PAGESIZE_LIMIT)
  const [searchParams] = useSearchParams()
  const nav = useNavigate()
  const { pathname } = useLocation()
  useEffect(() => {
    const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1
    const pageSize =
      parseInt(searchParams.get(LIST_PAGESIZE_PARAM_KEY) || '') || LIST_PAGESIZE_LIMIT
    setPage(page)
    setPageSize(pageSize)
  }, [searchParams])
  const onChange: PaginationProps['onChange'] = (page, pageSize) => {
    console.log(page, pageSize)

    searchParams.set(LIST_PAGESIZE_PARAM_KEY, pageSize.toString())
    searchParams.set(LIST_PAGE_PARAM_KEY, page.toString())
    nav({
      pathname,
      search: searchParams.toString(), // 除了改变 page pageSize 之外，其他的 url 参数要带着
    })
  }
  return (
    <Pagination
      showSizeChanger
      onChange={onChange}
      defaultCurrent={1}
      current={page}
      pageSize={pageSize}
      total={total}
    />
  )
}
export default ListPage
