import React from 'react'
import { Button, Result } from 'antd'
import { useNavigate } from 'react-router-dom'
import { MANAGE_LIST_URL } from '../utils/constant'
export default function NotFound() {
  const nav = useNavigate()
  return (
    <Result
      status="404"
      title="404"
      subTitle="您访问的页面不存在"
      extra={
        <Button
          type="primary"
          onClick={() => {
            nav(MANAGE_LIST_URL)
          }}
        >
          返回首页
        </Button>
      }
    ></Result>
  )
}
