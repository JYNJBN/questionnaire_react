import React, { ChangeEvent, useEffect, useState } from 'react'
import { Input } from 'antd'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { LIST_SEARCH_PARAM_KEY } from '../constant/searchConstant'
import { log } from 'console'

export default function ListSearch() {
  const { Search } = Input
  const [value, setValue] = useState('')
  const nav = useNavigate()
  const { pathname } = useLocation()
  const [searchParams] = useSearchParams()

  // 监听地址栏参数的变化
  useEffect(() => {
    const newVal = searchParams.get(LIST_SEARCH_PARAM_KEY || '')
    console.log(newVal)
    setValue(newVal as string)
  }, [searchParams])
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }
  const handleSearch = (value: string) => {
    nav({
      pathname: pathname,
      search: `${LIST_SEARCH_PARAM_KEY}=${value}`,
    })
  }
  return (
    <div>
      <Search
        style={{ width: '300px' }}
        size="large"
        placeholder="搜索"
        value={value}
        onChange={handleChange}
        onSearch={handleSearch}
        allowClear={true}
      ></Search>
    </div>
  )
}
