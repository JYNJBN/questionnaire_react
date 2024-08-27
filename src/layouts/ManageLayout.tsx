import React, { useState } from 'react'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import styles from './ManageLayout.module.scss'
import { Button, Space, Divider, message } from 'antd'
import { PlusOutlined, BarsOutlined, StarOutlined, DeleteOutlined } from '@ant-design/icons'
import { addQuestionServiceApi } from '../services/question'
import { QUESTION_EDIT_URL } from '../constant/routerConstant'
import { useRequest } from 'ahooks'

export default function ManageLayout() {
  const nav = useNavigate()
  const location = useLocation()
  const { loading, run: handleAddQuestion } = useRequest(addQuestionServiceApi, {
    manual: true,
    onSuccess: result => {
      nav(QUESTION_EDIT_URL + result.id)
      message.success('创建成功')
    },
  })

  console.log(location)
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Space direction="vertical">
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={handleAddQuestion}
            loading={loading}
          >
            创建问卷
          </Button>
          <Divider />
          <Button
            type={location.pathname === '/manage/list' ? 'default' : 'text'}
            size="large"
            icon={<BarsOutlined />}
            onClick={() => nav('/manage/list')}
          >
            我的问卷
          </Button>
          <Button
            type={location.pathname === '/manage/Start' ? 'default' : 'text'}
            size="large"
            icon={<StarOutlined />}
            onClick={() => nav('/manage/Start')}
          >
            星标问卷
          </Button>
          <Button
            type={location.pathname === '/manage/trash' ? 'default' : 'text'}
            size="large"
            icon={<DeleteOutlined />}
            onClick={() => nav('/manage/trash')}
          >
            回收站
          </Button>
        </Space>
      </div>
      <div className={styles.right}>
        {/* 类似slot */}
        <Outlet />
      </div>
    </div>
  )
}
